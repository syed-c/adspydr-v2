import axios from 'axios';

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;

export async function callApifyActor({
  actorId,
  input,
}: {
  actorId: string;
  input: Record<string, unknown>;
}) {
  const actorPath = actorId.includes('/') ? actorId : `acts/${actorId}`;
  
  const response = await axios.post(
    `https://api.apify.com/v2/${actorPath}/runs`,
    { input },
    {
      headers: {
        Authorization: `Bearer ${APIFY_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const { id: runId } = response.data;

  let runResult = null;
  let status = 'RUNNING';
  let maxRetries = 15;
  let retries = 0;

  while ((status === 'RUNNING' || status === 'READY') && retries < maxRetries) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const statusResponse = await axios.get(
      `https://api.apify.com/v2/${actorPath}/runs/${runId}`,
      {
        headers: {
          Authorization: `Bearer ${APIFY_API_TOKEN}`,
        },
      }
    );

    status = statusResponse.data.data.status;
    retries++;

    if (status === 'SUCCEEDED') {
      const datasetId = statusResponse.data.data.defaultDatasetId;

      if (!datasetId) {
        return [];
      }

      const datasetResponse = await axios.get(
        `https://api.apify.com/v2/datasets/${datasetId}/items`,
        {
          headers: {
            Authorization: `Bearer ${APIFY_API_TOKEN}`,
          },
        }
      );

      runResult = datasetResponse.data;
      break;
    } else if (status === 'FAILED' || status === 'ABORTED') {
      const errorMsg = statusResponse.data.data.errorMessage || 'Unknown error';
      console.log(`Apify run ${status}: ${errorMsg}`);
      return [];
    }
  }

  if (!runResult) {
    console.log('Apify run timed out after retries');
    return [];
  }

  return runResult;
}
