import React, { useEffect, useState, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import AuthContext from "./context/AuthContext";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	registerables,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ActionKind, usePony } from "pony-props";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import "./Chart.scss";

const Chart = () => {
	const { chartData, setChartData, vitals, setVitals } =
		useContext(AuthContext);

	console.log(chartData);

	const [isBp, setIsBp] = useState(true);
	const [isStress, setIsStress] = useState(false);
	const [isHeart, setIsHeart] = useState(false);
	const [isOxygen, setIsOxygen] = useState(false);
	const [isRr, setIsRr] = useState(false);
	const [title, setTitle] = useState("Blood Pressure");

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		// responsive: false,
		maintainAspectRatio: false,
		scales: {
			y: {
				suggestedMin: 0,

				// the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
				suggestedMax: 1,
			},
		},
		// aspectRatio: 1 / 2,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: false,
				text: title,
			},
		},
	};

	const labels = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

	const data = [
		{
			title: "Blood Pressure",
			labels,
			datasets: [
				{
					label: "Systolic",
					data: [
						chartData?.days.Sun.systolic,
						chartData?.days.Mon.systolic,
						chartData?.days.Tue.systolic,
						chartData?.days.Wed.systolic,
						chartData?.days.Thu.systolic,
						chartData?.days.Fri.systolic,
						chartData?.days.Sat.systolic,
					],
					borderColor: "rgba(15, 102, 210, 1)",
					backgroundColor: "rgba(15, 102, 210, 1)",
				},
				{
					label: "Diastolic",
					data: [
						chartData?.days.Sun.diastolic,
						chartData?.days.Mon.diastolic,
						chartData?.days.Tue.diastolic,
						chartData?.days.Wed.diastolic,
						chartData?.days.Thu.diastolic,
						chartData?.days.Fri.diastolic,
						chartData?.days.Sat.diastolic,
					],
					borderColor: "rgb(53, 162, 235)",
					backgroundColor: "rgba(53, 162, 235, 0.5)",
				},
			],
		},

		{
			title: "Stress Level",
			labels,
			datasets: [
				{
					label: "",
					data: [
						chartData?.days.Sun.stress_status,
						chartData?.days.Mon.stress_status,
						chartData?.days.Tue.stress_status,
						chartData?.days.Wed.stress_status,
						chartData?.days.Thu.stress_status,
						chartData?.days.Fri.stress_status,
						chartData?.days.Sat.stress_status,
					],
					borderColor: "rgba(15, 102, 210, 1)",
					backgroundColor: "rgba(15, 102, 210, 1)",
				},
			],
		},

		{
			title: "Respiratory Rate",
			labels,
			datasets: [
				{
					label: "",
					data: [
						chartData?.days.Sun.respiratory_rate,
						chartData?.days.Mon.respiratory_rate,
						chartData?.days.Tue.respiratory_rate,
						chartData?.days.Wed.respiratory_rate,
						chartData?.days.Thu.respiratory_rate,
						chartData?.days.Fri.respiratory_rate,
						chartData?.days.Sat.respiratory_rate,
					],
					borderColor: "rgba(15, 102, 210, 1)",
					backgroundColor: "rgba(15, 102, 210, 1)",
				},
			],
		},

		{
			title: "Heart Rate",
			labels,
			datasets: [
				{
					label: "",
					data: [
						chartData?.days.Sun.beats_per_minute,
						chartData?.days.Mon.beats_per_minute,
						chartData?.days.Tue.beats_per_minute,
						chartData?.days.Wed.beats_per_minute,
						chartData?.days.Thu.beats_per_minute,
						chartData?.days.Fri.beats_per_minute,
						chartData?.days.Sat.beats_per_minute,
					],
					borderColor: "rgba(15, 102, 210, 1)",
					backgroundColor: "rgba(15, 102, 210, 1)",
				},
			],
		},

		{
			title: "Oxygen Saturation",
			labels,
			datasets: [
				{
					label: "",
					data: [
						chartData?.days.Sun.oxygen,
						chartData?.days.Mon.oxygen,
						chartData?.days.Tue.oxygen,
						chartData?.days.Wed.oxygen,
						chartData?.days.Thu.oxygen,
						chartData?.days.Fri.oxygen,
						chartData?.days.Sat.oxygen,
					],
					borderColor: "rgba(15, 102, 210, 1)",
					backgroundColor: "rgba(15, 102, 210, 1)",
				},
			],
		},
	];

	const {
		getSectionProps,
		getHeadingProps,
		getCarouselWrapperProps,
		getCarouselProps,
		getCarouselItemProps,
		getButtonProps,
		getAnnouncerProps,
		state,
	} = usePony({ numItems: data.length });

	const handleTitle = (e) => {
		setTitle(e);
	};

	return (
		<div>
			<div className=" w-full max-md:w-[100%] mx-auto bg-input_bg rounded-md p-[1rem]">
				<div {...getSectionProps()}>
					<div className=" flex justify-between items-center">
						<button {...getButtonProps(ActionKind.Previous)}>
							<BsArrowLeft className=" text-4xl font-bold" />
						</button>
						<button {...getButtonProps(ActionKind.Next)}>
							<BsArrowRight className=" text-4xl font-bold" />
						</button>
						{/* <button {...getButtonProps(ActionKind.Previous)}>Previous</button>
            <button {...getButtonProps(ActionKind.Next)}>Next</button> */}
					</div>
					<div
						{...getCarouselWrapperProps()}
						className=" w-full max-md:w-[100%] mx-auto"
					>
						<ul {...getCarouselProps()}>
							{data.map((item, idx) => (
								<li
									key={idx}
									{...getCarouselItemProps(idx)}
									className=" relative w-[100%]"
								>
									<div className="absolute flex items-center">
										<h1 {...getHeadingProps()} className=" mr-[2rem]">
											Range this week
										</h1>
										<h2 className="bg-input_border rounded-sm p-[0.5rem]">
											{item.title}
										</h2>
									</div>
									<Line
										options={options}
										data={item}
										className=" relative mt-[4rem]"
									/>
								</li>
							))}
						</ul>
					</div>

					<div {...getAnnouncerProps()}>
						<p>{`Item ${state.activeSlideIndex + 1} of ${data.length}`}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chart;

// const [bpSeries, setBpSeries] = useState([
//   {
//     name: "Systolic",
//     data: [
//       chartData?.days.Mon.systolic,
//       chartData?.days.Tue.systolic,
//       chartData?.days.Wed.systolic,
//       chartData?.days.Thu.systolic,
//       chartData?.days.Fri.systolic,
//       chartData?.days.Sat.systolic,
//       chartData?.days.Sun.systolic,
//     ],
//   },
//   {
//     name: "Diastolic",
//     data: [
//       chartData?.days.Mon.diastolic,
//       chartData?.days.Tue.diastolic,
//       chartData?.days.Wed.diastolic,
//       chartData?.days.Thu.diastolic,
//       chartData?.days.Fri.diastolic,
//       chartData?.days.Sat.diastolic,
//       chartData?.days.Sun.diastolic,
//     ],
//   },
// ]);

// const [bpOptions, setBpOptions] = useState({
//   chart: {
//     height: 350,
//     type: "line",
//     dropShadow: {
//       enabled: true,
//       color: "#000",
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2,
//     },
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#77B6EA", "#545454"],
//   dataLabels: {
//     enabled: true,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   title: {
//     text: "Range for the week",
//     align: "left",
//   },
//   grid: {
//     borderColor: "#e7e7e7",
//     row: {
//       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//       opacity: 0.5,
//     },
//   },
//   markers: {
//     size: 1,
//   },
//   xaxis: {
//     categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
//     title: {
//       text: "Day",
//     },
//   },
//   yaxis: {
//     title: {
//       text: "Blood Presure",
//     },
//     min: 0,
//     max: 300,
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "right",
//     floating: true,
//     offsetY: -25,
//     offsetX: -5,
//   },
// });

// const [stressSeries, setStressSeries] = useState([
//   {
//     name: "Stress Level",
//     data: [
//       chartData?.days.Mon.stress_status,
//       chartData?.days.Tue.stress_status,
//       chartData?.days.Wed.stress_status,
//       chartData?.days.Thu.stress_status,
//       chartData?.days.Fri.stress_status,
//       chartData?.days.Sat.stress_status,
//       chartData?.days.Sun.stress_status,
//     ],
//   },
// ]);

// const [stressOptions, setStressOptions] = useState({
//   chart: {
//     height: 350,
//     type: "line",
//     dropShadow: {
//       enabled: true,
//       color: "#000",
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2,
//     },
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#77B6EA", "#545454"],
//   dataLabels: {
//     enabled: true,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   title: {
//     text: "Range for the week",
//     align: "left",
//   },
//   grid: {
//     borderColor: "#e7e7e7",
//     row: {
//       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//       opacity: 0.5,
//     },
//   },
//   markers: {
//     size: 1,
//   },
//   xaxis: {
//     categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
//     title: {
//       text: "Day",
//     },
//   },
//   yaxis: {
//     title: {
//       text: "Stress Level",
//     },
//     categories: ["Low", "Normal", "High"],
//     //   min: 0,
//     //   max: 2,
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "right",
//     floating: true,
//     offsetY: -25,
//     offsetX: -5,
//   },
// });

// const [rrSeries, setRrSeries] = useState([
//   {
//     name: "Respiratory Rate",
//     data: [
//       chartData?.days.Mon.respiratory_rate,
//       chartData?.days.Tue.respiratory_rate,
//       chartData?.days.Wed.respiratory_rate,
//       chartData?.days.Thu.respiratory_rate,
//       chartData?.days.Fri.respiratory_rate,
//       chartData?.days.Sat.respiratory_rate,
//       chartData?.days.Sun.respiratory_rate,
//     ],
//   },
// ]);

// const [rrOptions, setRrOptions] = useState({
//   chart: {
//     height: 350,
//     type: "line",
//     dropShadow: {
//       enabled: true,
//       color: "#000",
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2,
//     },
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#77B6EA", "#545454"],
//   dataLabels: {
//     enabled: true,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   title: {
//     text: "Range for the week",
//     align: "left",
//   },
//   grid: {
//     borderColor: "#e7e7e7",
//     row: {
//       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//       opacity: 0.5,
//     },
//   },
//   markers: {
//     size: 1,
//   },
//   xaxis: {
//     categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
//     title: {
//       text: "Day",
//     },
//   },
//   yaxis: {
//     title: {
//       text: "Respiratory Rate",
//     },
//     min: 0,
//     max: 300,
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "right",
//     floating: true,
//     offsetY: -25,
//     offsetX: -5,
//   },
// });

// const [heartSeries, setHeartSeries] = useState([
//   {
//     name: "Heart Rate",
//     data: [
//       chartData?.days.Mon.beats_per_minute,
//       chartData?.days.Tue.beats_per_minute,
//       chartData?.days.Wed.beats_per_minute,
//       chartData?.days.Thu.beats_per_minute,
//       chartData?.days.Fri.beats_per_minute,
//       chartData?.days.Sat.beats_per_minute,
//       chartData?.days.Sun.beats_per_minute,
//     ],
//   },
// ]);

// const [heartOptions, setHeartOptions] = useState({
//   chart: {
//     height: 350,
//     type: "line",
//     dropShadow: {
//       enabled: true,
//       color: "#000",
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2,
//     },
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#77B6EA", "#545454"],
//   dataLabels: {
//     enabled: true,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   title: {
//     text: "Range for the week",
//     align: "left",
//   },
//   grid: {
//     borderColor: "#e7e7e7",
//     row: {
//       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//       opacity: 0.5,
//     },
//   },
//   markers: {
//     size: 1,
//   },
//   xaxis: {
//     categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
//     title: {
//       text: "Day",
//     },
//   },
//   yaxis: {
//     title: {
//       text: "Heart Rate",
//     },
//     min: 0,
//     max: 300,
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "right",
//     floating: true,
//     offsetY: -25,
//     offsetX: -5,
//   },
// });

// const [oxygenSeries, setOxygenSeries] = useState([
//   {
//     name: "Oxygen Saturation",
//     data: [
//       chartData?.days.Mon.oxygen,
//       chartData?.days.Tue.oxygen,
//       chartData?.days.Wed.oxygen,
//       chartData?.days.Thu.oxygen,
//       chartData?.days.Fri.oxygen,
//       chartData?.days.Sat.oxygen,
//       chartData?.days.Sun.oxygen,
//     ],
//   },
// ]);

// const [oxygenOptions, setOxygenOptions] = useState({
//   chart: {
//     height: 350,
//     type: "line",
//     dropShadow: {
//       enabled: true,
//       color: "#000",
//       top: 18,
//       left: 7,
//       blur: 10,
//       opacity: 0.2,
//     },
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#77B6EA", "#545454"],
//   dataLabels: {
//     enabled: true,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   title: {
//     text: "Range for the week",
//     align: "left",
//   },
//   grid: {
//     borderColor: "#e7e7e7",
//     row: {
//       colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//       opacity: 0.5,
//     },
//   },
//   markers: {
//     size: 1,
//   },
//   xaxis: {
//     categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
//     title: {
//       text: "Day",
//     },
//   },
//   yaxis: {
//     title: {
//       text: "Oxygen Saturation",
//     },
//     min: 0,
//     max: 300,
//   },
//   legend: {
//     position: "top",
//     horizontalAlign: "right",
//     floating: true,
//     offsetY: -25,
//     offsetX: -5,
//   },
// });

// const chart = [
//   {
//     id: 1,
//     options: bpOptions,
//     series: bpSeries,
//     isDisplay: isBp,
//   },
//   {
//     id: 2,
//     options: stressOptions,
//     series: stressSeries,
//     isDisplay: isStress,
//   },
//   {
//     id: 3,
//     options: rrOptions,
//     series: rrSeries,
//     isDisplay: isRr,
//   },
//   {
//     id: 4,
//     options: heartOptions,
//     series: heartSeries,
//     isDisplay: isHeart,
//   },
//   {
//     id: 5,
//     options: oxygenOptions,
//     series: oxygenSeries,
//     isDisplay: isOxygen,
//   },
// ];
