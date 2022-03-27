// 네비게이션 바

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="max-w-screen-xl mx-auto flex justify-between items-start content-center space-y-2 pt-4 pb-2 px-4 border-b-[1px]">
			<div className="flex space-y-2 justify-start items-center">
				<div className="text-left flex content-center ">
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
					<nav className="flex">
						<ul className="flex justify-between text-md space-x-6 pr-12">
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
			<div className="space-xs-10 flex items-start">
				<ul className="space-x-4 ">
				
					<li className='text-sm border-[1px] border-gray-500 px-4 py-2 rounded-3xl'>
						<Link to="#">로그인</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
