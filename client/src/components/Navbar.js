import { useState } from "react";

import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavItem = (props) => {
    return <li className={`mx-4 cursor-pointer ${props.classProps}`}>{props.children}</li>;
};

const Navbar = (props) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav className="w-full flex md:justify-center justify-between items-center p-4 bg-opacity-5 bg-slate-100">
            <div className="md:flex-[0.5] flex-initial">
                {/*justify-center items-center */}
                <h1 className="text-3xl text-white font-extrabold">SoapSend</h1>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                    <NavItem key={index}>{item}</NavItem>
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {toggleMenu ? (
                    <AiOutlineClose
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => {
                            setToggleMenu(false);
                        }}
                    />
                ) : (
                    <HiMenuAlt4
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => {
                            setToggleMenu(true);
                        }}
                    />
                )}
                {toggleMenu && (
                    <ul
                        className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none 
                                   flex flex-col justify-start items-end rounded-md blue-glassmorphism 
                                   text-white animate-slide-in"
                    >
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose
                                onClick={() => {
                                    setToggleMenu(false);
                                }}
                            />
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                            <NavItem key={index} classProps="my-2 text-lg">
                                {item}
                            </NavItem>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
