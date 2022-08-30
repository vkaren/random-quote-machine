const category = "happiness";
const colors = ["#00252a", "#680000", "#9fa100", "#460088"];
let idx = 0;
$("#new-quote").click(onQuote);

function onQuote() {
  $.ajax({
    method: "GET",
    url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
    headers: { "X-Api-Key": "4dEzgSto2zo43ABrKvUW6A==o7A75RTGhyvznf0m" },
    contentType: "application/json",
    success: function (result) {
      const quote = result[0].quote;
      const author = result[0].author;

      $("#text").text(quote);
      $("#author").text(author);

      if (idx > 3) {
        idx = 0;
      }
      let currentColor = colors[idx];

      $("body").css({ background: currentColor, color: currentColor });
      $("#new-quote").css({
        background: currentColor,
        border: "1px solid" + currentColor,
      });
      $("#tweet-quote").css({
        background: currentColor,
        border: "1px solid" + currentColor,
      });

      $("#new-quote").hover(
        function () {
          $(this).css({
            color: currentColor,
            background: "white",
            border: "1px solid" + currentColor,
          });
        },
        function () {
          $(this).css({ color: "white", background: currentColor });
        }
      );

      $("#tweet-quote").hover(
        function () {
          $(this).css({ background: "white", border: "1px solid" + currentColor });
          $("#tweet-quote img").attr(
            "src",
            "https://img.icons8.com/ios-glyphs/30/" +
              currentColor.slice(1) +
              "/twitter--v1.png"
          );
        },
        function () {
          $(this).css({ background: currentColor });
          $("#tweet-quote img").attr(
            "src",
            "https://img.icons8.com/ios-glyphs/30/ffffff/twitter--v1.png"
          );
        }
      );
      idx++;
    },
    error: function ajaxError(jqXHR) {
      console.error("Error: ", jqXHR.responseText);
    },
  });
}

onQuote();

$("#tweet-quote").click(onTweetClick);

function onTweetClick() {
  const tweet = '"' + $("#text").text() + '" ' + $("#author").text();
  $("#tweet-quote").attr(
    "href",
    `https://www.twitter.com/intent/tweet?hashtags=quotes&text=${tweet}`
  );
}