//Imports
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const fs = require("fs");

(async () => {
  args = process.argv;
  //console.log(args);
  let permalink = args[2];
  console.log("permalink: " + permalink);
  try {
    //starting Chrome
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH,
      headless: false,
    });
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(process.env.FB_LOGIN, ["notifications"]);
    //Opening the Facebook Login
    const page = await browser.newPage({ viewport: null });
    await page.goto(permalink);
    await delay(2000);

    const postfeatures = await page.evaluate(() => {
      /*post = {
            Author,done
            text,done
            likes,done
            comments,
            shares,done
            verified,
            date,done
            category
        }*/
      post = {};
      //features we are interested in
      container = document.querySelector("#page");
      author = container.querySelector(
        "#MPhotoContent > div._2vj7._2phz.voice.acw > div > div._4g34 > div > div > div.msg > a > strong"
      ).innerText;
      console.log(author);
      text = container.querySelector(
        "#MPhotoContent > div._2vj7._2phz.voice.acw > div > div._4g34 > div > div > div.msg > div"
      );
      if(text){
        text = text.innerText;
        console.log(text);
      }else{
        text = "";
      }
      likes = container.querySelector('div[class="like_def _55wr likes _1-uw"]')
        .innerText;
      likes = likes.match(/(\d+)/);
      console.log(likes[0]);
      shares = container.querySelector('div[class="_43lx _55wr"]')
        .innerText;
      shares = shares.replace(/[a-z]/g, '').trim();
      console.log(shares);
      date = document.querySelector('abbr')
        .innerText;
      date = date;
      console.log(date);
      
      permalink.replace('//m','//www');
      console.log(permalink);

      // #mount_0_0_mT > div > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb > div > div > div.j83agx80.cbu4d94t.d6urw2fd.dp1hu0rb.l9j0dhe7.du4w35lb > div:nth-child(1) > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.pfnyh3mw.d2edcug0.hpfvmrgz.hybvsw6c.gitj76qy.dp1hu0rb.kelwmyms.dzul8kyi.e69mrdg2 > div > div.rq0escxv.l9j0dhe7.du4w35lb.j83agx80.cbu4d94t.pfnyh3mw.rirtxc74.nnvw5wor.hybvsw6c.bipmatt0.jkusjiy0 > div > div.j83agx80.cbu4d94t.buofh1pr.l9j0dhe7 > div:nth-child(2) > div > div.l9j0dhe7 > div > div.bp9cbjyn.j83agx80.pfnyh3mw.p1ueia1e > div:nth-child(1) > div > span

      post["author"] = author;
      post["text"] = text;
      post["likes"] = likes[0];
      post["shares"] = shares;
      post["date"] = date;
      return post;
    });
    console.log(postfeatures);
    //closing the browser
    await browser.close();
  } catch (error) {
    console.log("Catched error message", error.message);
    console.log("Catched error stack", error.stack);
    console.log("Catched error ", error);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
