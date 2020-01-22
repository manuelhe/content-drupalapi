import processPrograms from "./modules/processPrograms";

const args = process.argv.slice(2);
const isDryRun = args.includes("dry-run");

if (isDryRun) {
  args.splice(args.indexOf("dry-run"), 1);
}

const init = async () => {
  await processPrograms(isDryRun);
};

init();
