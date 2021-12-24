const express = require("express");
const { send } = require("express/lib/response");
const app = express();
// #1 html에서 data를 원하는 데이터를 빼올때 - parse -할 때,
// parse는 interpreter나 compiler의 구성 요소 가운데 하나로 입력 token에 내재된 자료 구조를 빌드하고 문법을 검사한다
// HTML 문서 등에서 Markup Tag 등을 입력으로 받아들여 구문을 해석할 수 있는 단위로 여러 부분으로 분할해주는 역할

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});
//post req를 받으면 어떻게 처리할 지 결정.
app.post("/", function (req, res) {
	// res.send("<p>thanks for posting that!</p>");
	// #2 parse 되는 걸 확인할 수 있다.
	// console.log(req.body);
	// console.log(req.body.num1);

	// #3 계산식 만들기
	const num1 = Number(req.body.num1);
	const num2 = Number(req.body.num2);
	const result = num1 + num2;
	res.send("result is " + result);
});

app.get("/bmicalc", function (req, res) {
	res.sendFile(__dirname + "/bmicalc.html");
});
app.post("/bmicalc", function (req, res) {
	const weight = parseFloat(req.body.weight);
	const height = parseFloat(req.body.height);
	// let bmi = weight / Math.pow(height);
	const bmi = weight / Math.round(height * height);
	// height은 미터 기준. (몸무게 나누기 키(m)의 제곱)
	res.send("your BMI is " + bmi);
});

app.listen(3000, function () {
	console.log("Server running at port 3000");
});
