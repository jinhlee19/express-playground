// 네비게이션 바

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="max-w-screen-lg flex justify-between space-y-2 pt-4 pb-2 px-4 border-b-[1px]">
			<div className="flex space-y-2 justify-start ">
				<div className="text-left flex">
					<h1 className="text-2xl uppercase font-black">Dayo</h1>
					<svg
						className="animate-bounce inline-block fill-current text-amber-400 w-4 h-4"
						viewBox="0 0 38 38"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M16 23.5 6 31l4-12-9-7h11L16 .5 20 12h11l-9 7 4 12z" />
					</svg>
				</div>
				<div className="pb-2 ml-10">
					<nav className="flex items-center">
						{/* <span className="border-l-2 border-amber-300 h-4 mr-8"></span> */}
						<ul className="flex justify-between text-md items-center space-x-6 pr-12">
							<li>
								<Link to="#">기관</Link>
							</li>
							<li>
								<Link to="#">구직</Link>
							</li>
							<li>
								<Link to="#">기업</Link>
							</li>
							<li>
								<Link to="#">서비스</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="space-xs-10">
				<ul className='flex align-center space-x-4'>
					<li>
						<Link to="#">
							<svg
								className="w-7 h-7"
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 38 38"
							>
								<path
									fill="none"
									stroke-miterlimit="10"
									stroke="#000"
									d="M13 28.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM25 28.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM13 28.5h6M7 28.5 5 1H0M6.5 21.5 28 20l3.5-15h-26"
								/>
							</svg>
						</Link>
					</li>
					<li className='text-sm border-[1px] border-gray-500 px-4 py-2 rounded-3xl'>
						<Link to="#">로그인</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
