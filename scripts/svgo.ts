import * as path from "path";
import glob from "glob";
import shelljs from "shelljs";
import inquirer from "inquirer";

const spaceRule = /\s/;
const execPath = /src.*/;
const fileNameRule = /([^/]+)\.svg$/;
const BASE_SVG_PATH = path.resolve(__dirname, "../src/icons/svg");

interface ReturnAsk {
  svgList: string;
}

function ask(): Promise<ReturnAsk> {
  return new Promise(resolve => {
    inquirer
      .prompt([
        {
          name: "svgList",
          message: "请输入需要优化的svg文件名称, 多个文件用空格隔开:",
          validate: name => {
            if (!name) {
              return "请输入文件名!";
            }
            return true;
          }
        }
      ])
      .then(answer => {
        resolve(answer);
      });
  });
}

async function optimizeSvg() {
  const { svgList } = await ask();
  const files = spaceRule.test(svgList) ? svgList.split(" ") : [svgList];
  const entryFilePaths = glob.sync(BASE_SVG_PATH + "/**/*.svg");

  entryFilePaths.forEach(filePath => {
    const filename = (filePath.match(fileNameRule) as RegExpMatchArray)[1];

    if (files.includes(filename)) {
      try {
        const execCommand = (filePath.match(execPath) as RegExpMatchArray)[0];
        shelljs.exec(`svgo ${execCommand} --config=src/icons/svgo.yml`);
        console.log(`成功优化了${filename}.svg文件`);
      } catch (e) {
        console.log("执行失败, 请检查名字是否符合规范");
        process.exit(1);
      }
    }
  });
}

optimizeSvg().then(() => console.log("执行结束"));
