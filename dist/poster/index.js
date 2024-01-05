"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBlog = void 0;
const dotenv = require('dotenv');
// load the environment variables from the .env file
dotenv.config();
const ENDPOINT = process.env.GRAPHQL_ENDPOINT || '';
const BEARER_TOKEN = process.env.GRAPHQL_API_KEY || '';
async function postBlog(post) {
    const date = new Date().toISOString().split('T')[0];
    // remove any quotation marks from the body and replace newline characters with \\n
    post.body = post.body.replace(/"/g, '').replace(/\n/g, '\\n');
    const mutation = `
    mutation {
      createPost(
        data: {
          body: "${post.body}",
          image: {
            connect: {
              id: "clqzrqafxemwn0ckaokarkowf"
            }
          }
          hook: "WILT — A dive and recap into what I learned this week. This is part of a weekly series that is summarized via daily reflections and compiled by ChatGPT 🚀", 
          tweetText: "I don't think I even use this anymore...", 
          slug: "wilt-week-of-${date}", 
          title: "${post.title}"
        }
      ) {
        id
      }
    }
  `;
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({
            query: mutation,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        console.log(`❌ Error creating blog`);
        console.log(data.errors);
    }
    else {
        console.log(`✅ Blog created`);
        const postMutation = `
    mutation {
      publishPost(where: {slug: "wilt-week-of-${date}"}) {
        id
      }
    }
    `;
        const postResponse = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${BEARER_TOKEN}`,
            },
            body: JSON.stringify({
                query: postMutation,
            }),
        });
        const postData = await postResponse.json();
        if (postData.errors) {
            console.log(`❌ Error publishing blog`);
            console.log(postData.errors);
        }
        else {
            console.log(`✅ Blog published`);
        }
    }
}
exports.postBlog = postBlog;
