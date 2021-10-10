const file_Qstring = `input[type="file"]`;
const app = ".sentDWNLD";
//
const fileHolder = document.querySelector(file_Qstring);
const app_ = document.querySelector(app);
//document.querySelector("span#progress_value_show_span")
//
const regex = /\p{Extended_Pictographic}/u;
//
let isIncreased = 0;
let NODEdownloadlist1 = [];
//
let REALFILE_ = [];
//15000
let oneMB = 1000000;
let upLOADsPEED = oneMB * 1; //5000000 bytes = 5MB;
//alert(window.innerWidth < 400);
//function
const listed_ = () => {
  (async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (isIncreased < data.length) {
      isIncreased = data.length;

      const MtcArr = (bigArr, smallArr) => {
        let c = [];

        bigArr.forEach((data, i) => {
          if (!smallArr.includes(data)) {
            c.push(data);
          }
        });

        for (let index = 0; index < c.length; index++) {
          const el = c[index];

          firstForeachShowName(el);

          smallArr.push(el);
        }
      };

      MtcArr(data, NODEdownloadlist1);
    } else if (isIncreased > data.length) {
      isIncreased--;
      let NW_arr = [];

      NODEdownloadlist1.forEach((fl, it_) => {
        if (!data.includes(fl)) {
          const newParr = document.querySelectorAll("p#downloadListID_p");
          Array.from(newParr).forEach((cd) => {
            if (cd.children[0].textContent === fl) {
              cd.remove();
            }
          });
        } else {
          NW_arr.push(fl);
        }

        if (it_ + 1 === NODEdownloadlist1.length) {
          NODEdownloadlist1 = NW_arr;
        }
      });
    }
  })("/downloadlist");
};

const downloadOne = (url1, FL_NAME) => {
  let a_ = document.createElement("a");
  a_.href = `${url1}`;
  a_.style.display = `none`;
  a_.download = FL_NAME;
  a_.click();
  document.body.appendChild(a_);
  window.URL.revokeObjectURL(url1);
  a_.remove();

  document.querySelector(".send__").innerHTML = `Please wait !`;
  setTimeout(() => {
    document.querySelector(".send__").innerHTML = ``;
  }, 2000);
};

const downloadFile = (e) => {
  if (e.target.id === "d_ID") {
    (async (url) => {
      let totalLEN = 0;
      //let arBFR = [];
      const response = await fetch(url, {
        headers: { "file-name": e.target.dataset.downloadlinktype },
      });
      // Retrieve its body as ReadableStream

      //const CNT_TYPE = response.headers.get("Content-type");
      const FL_NAME = response.headers.get("file-name");
      const FL_SIZE = response.headers.get("file-size");
      let ttlREC = 0;

      const reader = response.body.getReader();

      const ReadableStreamObj = {
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            // When no more data needs to be consumed, break the reading
            if (done) {
              /*let blb = new Blob(arBFR, {
                type: CNT_TYPE,
              });
              const url1 = window.URL.createObjectURL(blb);

              downloadOne(url1, FL_NAME);*/

              break;
            }

            // Enqueue the next data chunk into our target stream
            controller.enqueue(value);
            //arBFR.push(value);

            totalLEN += value.length;
            ttlREC = (totalLEN * 100) / FL_SIZE;

            e.target.parentNode.parentNode.children[1].style.transform = `translateX(-${
              100 - ttlREC
            }%)`;

            e.target.parentNode.parentNode.children[3].style.display = `flex`;
            e.target.parentNode.parentNode.children[3].innerHTML = `
             ${(totalLEN / oneMB).toFixed(2)} MB / ${(FL_SIZE / oneMB).toFixed(
              2
            )} MB
            `;
          }

          // Close the stream
          controller.close();
          reader.releaseLock();
        },
      };

      const rs = new ReadableStream(ReadableStreamObj);
      // Create a new response out of the stream
      const rs1 = new Response(rs);

      // Create an object URL for the response
      const blob = await rs1.blob();
      const url1 = URL.createObjectURL(blob);
      downloadOne(url1, FL_NAME);
      // Update image

      /*const res = await fetch(url, {
      headers: { "file-name": e },
    });
    console.log(res.body);

    const reader = res.body.getReader();

    const data = await res.blob();

    console.log(data);*/
    })("/download");
  } else if (e.target.id === "del_ID") {
    (async (url) => {
      const response = await fetch(url, {
        headers: { "file-name": e.target.dataset.dellinktype },
      });
      const result = await response.json();

      if (result === 1) {
        isIncreased--;
        let NW_arr = [];

        NODEdownloadlist1.forEach((fl, i) => {
          if (fl !== e.target.dataset.dellinktype) {
            NW_arr.push(fl);
          }

          if (i + 1 === NODEdownloadlist1.length) {
            NODEdownloadlist1 = NW_arr;
          }
        });

        e.target.parentNode.parentNode.remove();
      } else {
        document.querySelector(
          ".send__"
        ).innerHTML = `Something went wrong please try again later !`;
        setTimeout(() => {
          document.querySelector(".send__").innerHTML = ``;
        }, 2500);
      }
    })("/delete");
  }
};

const firstForeachShowName = (e) => {
  let styleP = {
    position: "relative",
    margin: "10px",
    padding: "10px",
    background: "#00000059",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    overflow: "hidden",
  };
  let styleSpan = {
    position: "relative",
    width: "800px",
    wordBreak: "break-all",
  };
  let styleButton = `
    border: none;
    padding: 6px 10px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    margin: 10px 0;
  `;
  let styleButton1 = `
    border: none;
    padding: 6px 10px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    margin: 10px;
  `;
  let styleSpan2 = {
    position: "absolute",
    background: "#da00fff2",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    zIndex: "-1",
    transform: "translateX(-100%)",
  };

  const p = document.createElement("p");
  Object.assign(p.style, styleP);

  p.id = "downloadListID_p";

  const sp1 = document.createElement("span");
  Object.assign(sp1.style, styleSpan);

  sp1.textContent = `${e}`;

  const sp2 = document.createElement("span");
  Object.assign(sp2.style, styleSpan2);

  p.appendChild(sp1);
  p.appendChild(sp2);
  p.innerHTML += `
   <div style="z-index:2">
    <button id="d_ID" style="${styleButton}" data-downloadlinktype="${e}">Download</button>
    <button id="del_ID" style="${styleButton1}" data-dellinktype="${e}">Delete</button>
   </div>
   <span style="z-index:1" id="downloadedData_ProgressID_"></span>
  `;
  document.body.appendChild(p);
};

const fileSelected = (e) => {
  if (e.target.files[0].size !== 0) {
    let cngName_ = e.target.files[0].name;

    Array.from(cngName_).forEach((tx) => {
      if (regex.test(tx)) {
        cngName_ = cngName_.replace(new RegExp(tx, "g"), " ");
      }
    });

    if (!NODEdownloadlist1.includes(cngName_)) {
      const file_AR = e.target.files;

      e.target.setAttribute("disabled", "disabled");

      Array.from(file_AR).forEach((file_, Mi) => {
        if (Mi === 0) {
          document.querySelector(".send__").innerHTML = `Process started..`;

          const commonF = () => {
            const FR = new FileReader();

            FR.onload = async (ev) => {
              let reslt_ = ev.currentTarget.result;
              let reslt_LN = reslt_.byteLength;
              let slicePer = upLOADsPEED;
              let slicePerCount = reslt_LN / slicePer;
              let sentAlready = 0;
              let sentBytes = 0;
              let out_ = 0;
              REALFILE_ = [];

              document.querySelector(
                "span#progress_value_show_span"
              ).style.display = "flex";

              document.querySelector(
                "span#progress_value_show_span"
              ).innerHTML = `
               ${0} MB / ${(reslt_LN / oneMB).toFixed(2)} MB
              `;

              document.querySelector(".send__").innerHTML = ``;
              e.target.value = "";

              for (let index = 0; index < slicePerCount + 1; index++) {
                let strt_ = index * slicePer;
                let end_ = strt_ + slicePer;
                let slicedData = reslt_.slice(strt_, end_);

                if (strt_ < reslt_LN) {
                  //REALFILE_.push(slicedData);

                  await fetch("/files", {
                    method: "POST",
                    headers: {
                      "content-type": file_.type, //"application/octet-stream",
                      "file-name": cngName_,
                      "file-size": file_.size,
                    },
                    body: slicedData, //REALFILE_[i],
                  });

                  sentBytes += upLOADsPEED;
                  sentAlready =
                    ((index + 1) * 100) / Math.floor(slicePerCount + 1);

                  if (sentAlready > 0 && sentAlready < 100) {
                    document.querySelector(
                      "span#progress_value_show_span"
                    ).innerHTML = `
                     ${sentBytes / oneMB} MB / ${(reslt_LN / oneMB).toFixed(
                      2
                    )} MB
                    `;

                    document.querySelector(
                      "span#send_span"
                    ).style.transform = `translateX(-${100 - sentAlready}%)`;
                  } else if (sentAlready === 100) {
                    document.querySelector(
                      "span#progress_value_show_span"
                    ).innerHTML = `
                     ${(reslt_LN / oneMB).toFixed(2)} MB / ${(
                      reslt_LN / oneMB
                    ).toFixed(2)} MB
                    `;

                    document.querySelector(
                      "span#progress_value_show_span"
                    ).style.display = "none";

                    e.target.removeAttribute("disabled");

                    document.querySelector(
                      "span#send_span"
                    ).style.transform = `translateX(-100%)`;
                  }
                } else {
                  if (out_ < 1) {
                    out_++;

                    //for (let i = 0; i < REALFILE_.length; i++) {}
                  }
                }
              }
            };

            FR.readAsArrayBuffer(file_);
          };

          commonF();
        }
      });
    } else {
      e.target.value = "";
    }
  } else {
    e.target.value = "";
    alert("The file is empty !");
  }
};

//init
listed_();
setInterval(() => {
  listed_();
}, 1000 * 1);
//
fileHolder.addEventListener("change", fileSelected);
document.body.addEventListener("click", downloadFile);
