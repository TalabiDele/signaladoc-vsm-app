import { translationObj } from "consts/translation";
import heart from "../assets/images/heart.png";
import respRate from "../assets/images/resp-rate.png";
import oxygen from "../assets/images/oxygen.png";
import pressure from "../assets/images/pressure.png";
import stress from "../assets/images/stress.png";
import heartResult from "../assets/images/heart-result.png";
import respRateResult from "../assets/images/resp-rate-result.png";
import oxygenResult from "../assets/images/oxygen-result.png";
import stressResult from "../assets/images/stress-result.png";
import bpResult from "../assets/images/bp-result.png";

export const FPS_CHECK_TIMEOUT = 5000;
export const FPS_CHECK_DONE_TIMEOUT = 1500;
export const FPS_CHECK_THRESHOLD = 5;

export const SCHEMA: Schema[] = [
	{
		name: "Heart Rate",
		longName: "Heart Rate",
		key: "measurementData.bpm",
		sign: "BPM",
		icon: heart,
		iconResult: heartResult,
		description:
			"Also known as pulse, this the number of times a person’s heart beats per minute.",
	},
	{
		name: "Breathing rate",
		longName: "Respiration Rate",
		key: "measurementData.rr",
		sign: "RPM",
		icon: respRate,
		iconResult: respRateResult,
		description:
			"A person’s respiratory rate is the number of breaths they take per minute.",
	},
	{
		name: "Oxygen",
		longName: "Blood oxygen",
		key: "measurementData.oxygen",
		sign: "%",
		icon: oxygen,
		iconResult: oxygenResult,
		description:
			"The percentage of oxyhemoglobin (oxygen bound hemoglobin) in the blood.",
	},
	// {
	//   name: "HRV SDNN",
	//   longName: "HRV SDNN",
	//   key: "hrvMetrics.sdnn",
	//   sign: "ms",
	//   icon: "sdnn.svg",
	//   iconResult: "sdnn-result.svg",
	// },
	{
		name: "Stress",
		longName: "Stress",
		key: "measurementData.stressStatus",
		sign: "",
		icon: stress,
		iconResult: stressResult,
		description: "Based on Baevsky’s and US/European Index level measurements.",
	},
	// {
	// 	name: "Blood Pressure",
	// 	longName: "Blood Pressure",
	// 	key: "bloodPressureStatus",
	// 	sign: "",
	// 	icon: pressure,
	// 	iconResult: bpResult,
	// 	description:
	// 		"The pressure of circulating blood on the walls of blood vessels.",
	// },
	{
		// name: "systolic",
		name: "Blood Pressure",
		// longName: "systolic",
		longName: "Blood Pressure",
		key: "bloodPressure.systolic",
		sign: "",
		icon: pressure,
		iconResult: bpResult,
		description:
			"The pressure of circulating blood on the walls of blood vessels.",
	},
	// {
	//   name: "diastolic",
	//   longName: "diastolic",
	//   key: "bloodPressure.diastolic",
	//   sign: "",
	//   icon: pressure,
	//   iconResult: bpResult,
	//   description:
	//     "The pressure of circulating blood on the walls of blood vessels.",
	// },
];

export const CALCULATION_TIMEOUT = 2 * 60 * 1000; // 2min

export const NOTIFICATION_TIMEOUT = 5000;
export const NOTIFICATION_FACE_ORIENT_WARNING =
	"NOTIFICATION_FACE_ORIENT_WARNING";
export const NOTIFICATION_FACE_SIZE_WARNING = "NOTIFICATION_FACE_SIZE_WARNING";
export const NOTIFICATION_LOW_FPS_WARNING = "NOTIFICATION_LOW_FPS_WARNING";
export const NOTIFICATION_INTERFERENCE_WARNING =
	"NOTIFICATION_INTERFERENCE_WARNING";

export interface Schema {
	name: string;
	longName: string;
	key: string;
	sign: string;
	icon: string;
	iconResult: string;
	description: string;
}

// todo lang from context
export const getSchema = (lang = "en"): Schema[] => {
	return SCHEMA.map((item) => ({
		...item,
		// @ts-ignore
		name: translationObj[lang][item.key],
	}));
};
