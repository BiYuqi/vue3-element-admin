import * as path from "path";
import glob from "glob";
import shelljs from "shelljs";
import inquirer from "inquirer";

const spaceRule = /\s/;
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
          message:
            "Please enter the name of the SVG file you want to optimize, separated by Spaces:",
          validate: name => {
            if (!name) {
              return "Please enter file name!";
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
        shelljs.exec(`svgo ${filePath}`);
        console.log(`The ${filename}.svg file was optimized successfully`);
      } catch (e) {
        console.log(
          "Failed to execute. Please check if the name conforms to the specification"
        );
        process.exit(1);
      }
    }
  });
}

optimizeSvg().then(() => console.log("Optimize the end."));
