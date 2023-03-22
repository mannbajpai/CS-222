exports.handler = async function (context, event, callback) {
    const client = context.getTwilioClient();
    const gallery = [
        {
          src: "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe.jpg",
          description: "Tasty Chole Bhature",
          alt: "chole Bhature",
          thumbnailWidth: "200px",
        },
        {
          src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI583mxdtUpLlsCV6_kWkLH_pVJirbRFPV7Gdp5ErsAqsrzL1ndc8PC8ReaeDZuDUQBxU&usqp=CAU",
          description:"Paani Ke Bataashe",
          alt:"Batashe",
          thumbnailWidth: "200px",
        },
        {
          src: "https://www.cookwithnabeela.com/wp-content/uploads/2021/08/Aloo_Samosa_Web_1.jpg",
          description: "Fried Potato Flour Puffs Yaani Samosa",
          alt: "Samosa",
          thumbnailWidth: "200px"
        }
      ];
    const messages = await client.messages.list({ to: context.TWILIO_NUMBER });
    for (const message of messages) {
      // You can have multiple medias on each message
      const pics = await message.media().list();
      for (const pic of pics) {
        // Add to the gallery array, use the outer loop's message value to put the same body
        // for each pic
        gallery.push({
          src: "https://api.twilio.com" + pic.uri.replace(".json", ""),
          description: message.body,
          alt: message.body,
          thumbnailWidth: "200px",
        });
      }
    }
    // Twilio Function will automatically turn gallery into proper JSON and set the 
    // header to `application\json`
    return callback(null, gallery);
  };