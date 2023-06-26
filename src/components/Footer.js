import React from "react";

const Footer = () => {
	return (
		<div className=" bg-primary py-[5rem]">
			<div className=" w-[90%] mx-auto grid grid-cols-3 text-white max-sm:flex max-sm:flex-col-reverse max-sm:text-center max-sm:items-center">
				<div className="">
					<h1 className=" mb-[1rem]">Company</h1>
					<ul>
						<li className=" mb-[1rem]">
							<a href="https://signaladoc.com/about-us">About SignalADoc</a>
						</li>
						<li className=" mb-[1rem]">
							<a href="https://signaladoc.com/faqs">FAQs</a>
						</li>
						<li className=" mb-[1rem]">
							<a href="https://signaladoc.com/privacy-policy">Privacy Policy</a>
						</li>
						<li className=" mb-[1rem]">
							<a href="https://signaladoc.com/terms-and-conditions">
								Terms & Conditions
							</a>
						</li>
						<li className=" mb-[1rem]">info@signaladoc.com</li>
					</ul>
				</div>
				<div className=" max-sm:mb-[2rem]">
					<h1 className=" mb-[1rem]">Contact Us</h1>
					<ul>
						<li className=" mb-[1rem]">
							<a href="https://twitter.com/signaladoc1">Twitter</a>
						</li>
						<li className=" mb-[1rem]">
							<a href="https://instagram.com/signaladoc?igshid=YmMyMTA2M2Y=">
								Instagram
							</a>
						</li>
						<li className=" mb-[1rem]">
							<a href="https://www.linkedin.com/company/signaladoc/">
								LinkedIn
							</a>
						</li>
						<li className=" mb-[1rem]">
							<a href="https://web.facebook.com/signaladoc">Facebook</a>
						</li>
					</ul>
				</div>

				<div className=" max-sm:mb-[2rem]">
					<h1 className=" mb-[1rem]">Disclaimer</h1>
					<p className=" leading-[1.5]">
						Our solution is not a replacement for a healthcare professional and
						our solution does not diagnose, prevent, provide any treatment for
						any form of illness or disease and should only be considered a tool
						to provide health and wellness data for informational purposes only.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
