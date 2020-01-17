import createTestCafe from "testcafe";

// Testcafe cannot test on IE < 11
// Testcafe testing on Chrome Android is currently broken (https://github.com/DevExpress/testcafe/issues/3948)
const browsers = [
	"saucelabs:Internet Explorer@11.285:Windows 10",
	"saucelabs:MicrosoftEdge@16.16299:Windows 10",
	"saucelabs:iPhone XS Simulator@12.2",
	"saucelabs:Safari@12.0:macOS 10.14",
	"chrome:headless",
	"firefox:headless"
];

(async () => {
	console.log("Here we go team, lets run some tests!");
	const testCafe = await createTestCafe(null, 8000, 8001);
	console.log("testcafe instance created :)");
	const errors = await testCafe
		.createRunner()
		.src("./tests/Sortable.compat.test.js")
		.browsers(browsers)
		.run();
	return errors;
})()
	.then(failedTests =>
		console.log(`We had "${failedTests}" amount of failed tests.`)
	)
	.catch(err => {
		console.log("Uh oh, we had some errors!");
		console.error(err);
	})
	.finally(() => process.exit());
