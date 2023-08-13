import fs, { Stats } from "fs-extra";
import path from "path";

//symlink同步
export const symlink = async (source: string, target: string) => {
  const src = path.resolve(__dirname, source);
  const dst = path.resolve(__dirname, target);

  if (
    (await fs
      .lstat(dst)
      .then((v) => v.isSymbolicLink())
      .catch(() => false)) &&
    (await fs.readlink(dst)) === src
  ) {
    // console.log("同步成功！");
  } else {
    fs.symlink(src, dst)
      .then(() => {
        // console.log("同步成功！");
      })
      .catch((e) => {
        console.log("同步失败！", e);
      });
  }
};

const main = () => {
  // 快捷方式
  symlink(`./auto-gen-ws`, `../../../client/assets/scripts/proto`);
  console.log("同步proto文件");

  symlink(`../common`, `../../../client/assets/scripts/common`);
  console.log("同步common文件");
};

main();
