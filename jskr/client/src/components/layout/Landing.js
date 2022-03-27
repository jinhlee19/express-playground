import React from 'react';

const Landing = () => {
	return (
		<div className="max-w-screen-xl mx-auto space-y-2 px-4 relative">
			<div className="bg-cover bg-center h-[180px] bg-blue-300 header-test relative">
				<div className="avatar-box inline-block absolute top-2/3 left-1/2 transform -translate-x-1/2 text-center space-y-0">
					<img
						className="h-[120px] w-[120px]  rounded-none border-8 border-white"
						src="https://source.unsplash.com/random "
						alt=""
					/>
					<div className="title text-lg">재능교육</div>
					<div className="text-base text-gray-400">서울 종로구 혜화동</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
