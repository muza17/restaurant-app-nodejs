console.clear()
const http = require("http");
const { Restaran } = require("./restaurants");
const { Branches } = require("./branches");
const { log } = require("console");

const server = http.createServer((req, res) => {
  console.log(req.url.split("/"));
  const splittedUrl = req.url.split("/");
  
  if(req.url.split("/")[1] == "" && req.method == "POST"){
    let resdata = "";
    req.on("data", (chunk) => (resdata += chunk));  //resdata = resdata+ chunk
    req.on("end", () => {
      resdata = JSON.parse(resdata);
      const res = {
        id: Restaran[Restaran.length - 1].id + 1,
        title: resdata.title,
        res_type: resdata.type,
        res_date: new Date()
      };
      Restaran.push(res);
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify("successed new restaurant"));
    return res.end("ok");

  }
    else if (splittedUrl[1] == "restaurants" && req.method == "GET") {
    if (Number(splittedUrl[2])) {
      console.log("number");
      const oneRes = Restaran.find((el) => el.id == splittedUrl[2]);
      const oneResbranches = Branches.filter(el => el.resId == splittedUrl[2])
      
      if (oneRes) {
        console.log("found");
        res.writeHead(200, { "Content-Type": "application/json" });
        let r = ((oneRes));
        let b = ((oneResbranches))
        let resbra = {
          restaurant: r,
          branches: b
        }
        res.write(JSON.stringify(resbra))
        return res.end();

      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify("Not found"));
        return res.end();

      }

    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(Restaran));
      return res.end();

    }   
  } else if (splittedUrl[1] == "branches" && req.method == "POST") {
    let branchdata = "";
    req.on("data", (chunk) => (branchdata += chunk));
    req.on("end", () => {
      branchdata = JSON.parse(branchdata);
      const branch = {
        id: Branches[Branches.length - 1].id + 1,
        title: branchdata.title,
        resId: branchdata.resId,
        branch_date: new Date(),
      };
      console.log(branch);
      Branches.push(branch);
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify("success"));
    
    return res.end("ok");
  }
  return res.end("Hellooo");
  
});

server.listen(8000, () => {
  console.log("I am in 8000");
});
