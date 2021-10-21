import { CloudTasksClient } from '@google-cloud/tasks';
import { google } from '@google-cloud/tasks/build/protos/protos';
import { Artifact } from 'lib/database/artifact.entity';
import env from 'lib/env';

const client = new CloudTasksClient();

export default async function createImportTask(artifact: Artifact) {
    if (process.env.NODE_ENV === 'development') {
        const body = JSON.stringify({
            id: artifact._id
        });
        const res = await fetch(`${env.NEXTAUTH_URL}/api/worker/import`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        });

        return res.ok;
    }

    const parent = client.queuePath(
        env.PROJECT_ID,
        env.IMPORT_QUEUE_LOCATION,
        env.IMPORT_QUEUE
    );

    const payload = {
        id: artifact._id
    };

    const task: google.cloud.tasks.v2.ITask = {
        appEngineHttpRequest: {
            appEngineRouting: {
                service: 'worker'
            },
            httpMethod: 'POST',
            relativeUri: '/import/',
            body: Buffer.from(JSON.stringify(payload)).toString('base64'),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    };

    // Send create task request.
    const request: google.cloud.tasks.v2.ICreateTaskRequest = { parent, task };
    await client.createTask(request);
    return true;
}
