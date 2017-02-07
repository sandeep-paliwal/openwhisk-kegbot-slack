/*
 * @returns {Promise}
 */
function main(params) {
    return new Promise(
        (resolve, reject) => {
            //send message to slack channel

            try {
                var IncomingWebhook = require("@slack/client").IncomingWebhook;
            } catch (err) {
                console.log(err);
                reject({
                        "message": "Could not load @slack/client",
                        "error": err.toString()
                    }
                );
            }

            var url = params.slack_webhook_url;

            var webhook = new IncomingWebhook(url);

            var slack_message_text = 'Hello there from JS';

            console.log(params);

            if(params !== null && params.source !== null && params.source === "creative-cloud" && params.asset !== null )
            {
                slack_message_text = 'Creative Cloud Event : ' + params.type + ' of type ' + params.asset.mime_type;
            }

            webhook.send(slack_message_text,
                function (err, res) {
                    if (err) {
                        console.log('Error:', err);
                        reject(params);
                    } else {
                        console.log('Message sent: ', res);
                        resolve(params);
                    }
                });
        }
    );
}

export default main;