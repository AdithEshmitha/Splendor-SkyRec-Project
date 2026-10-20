import React from 'react'
import { Link } from 'react-router-dom'
import {
    LuInstagram,
    LuFacebook,
    LuYoutube,
    LuArrowUpRight,
    LuMail,
    LuArrowUp
} from 'react-icons/lu'

const Footer = () => {

    return (
        <footer className="w-full bg-primary text-white mt-10">

            <div className="w-full  mx-auto px-5 sm:px-8 lg:px-18 pt-12 sm:pt-16 pb-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-10 sm:pb-14">

                    <div className="flex flex-col items-start gap-4">

                        <Link to="/" className="flex items-center gap-2.5">
                            <div className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center">
                                <span className="text-xl font-semibold">S</span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-xl font-semibold tracking-[0.15em]">
                                    SPLENDOR
                                </span>
                                <span className="text-[9px] tracking-[0.3em] text-white/60">
                                    BEAUTY & CARE
                                </span>
                            </div>
                        </Link>

                        <p className="text-sm text-white/65 leading-7 max-w-xs">
                            Discover your beauty with carefully selected beauty and personal care essentials for your everyday routine.
                        </p>

                        <div className="flex items-center gap-3 mt-1">

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                            >
                                <LuInstagram className="text-lg" />
                            </a>

                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                            >
                                <LuFacebook className="text-lg" />
                            </a>

                            <a
                                href="https://www.youtube.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                            >
                                <LuYoutube className="text-lg" />
                            </a>

                        </div>

                    </div>

                    <div className="flex flex-col items-start gap-4">

                        <h3 className="text-sm font-semibold tracking-wider uppercase">
                            Explore
                        </h3>

                        <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>

                        <div className="flex flex-col items-start gap-3.5 text-sm text-white/65">

                            <Link
                                to="/"
                                className="hover:text-white hover:translate-x-1 transition-all duration-200"
                            >
                                Home
                            </Link>

                            <Link
                                to="/products"
                                className="hover:text-white hover:translate-x-1 transition-all duration-200"
                            >
                                Shop All Products
                            </Link>

                            <Link
                                to="/products"
                                className="hover:text-white hover:translate-x-1 transition-all duration-200"
                            >
                                Best Sellers
                            </Link>

                            <Link
                                to="/products"
                                className="hover:text-white hover:translate-x-1 transition-all duration-200"
                            >
                                New Arrivals
                            </Link>

                        </div>

                    </div>

                    <div className="flex flex-col items-start gap-4">

                        <h3 className="text-sm font-semibold tracking-wider uppercase">
                            Categories
                        </h3>

                        <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>

                        <div className="flex flex-col items-start gap-3.5 text-sm text-white/65">

                            <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all duration-200">
                                Skin Care
                            </Link>

                            <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all duration-200">
                                Makeup
                            </Link>

                            <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all duration-200">
                                Hair Care
                            </Link>

                            <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all duration-200">
                                Body Care
                            </Link>

                            <Link to="/products" className="hover:text-white hover:translate-x-1 transition-all duration-200">
                                Fragrance
                            </Link>

                        </div>

                    </div>

                    <div className="flex flex-col items-start gap-4">

                        <h3 className="text-sm font-semibold tracking-wider uppercase">
                            Stay Connected
                        </h3>

                        <div className="w-8 h-0.5 bg-white/40 rounded-full"></div>

                        <p className="text-sm text-white/65 leading-7">
                            Discover beauty essentials and find products that fit your daily routine.
                        </p>

                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-2 mt-1 text-sm font-medium border-b border-white/40 pb-2 hover:border-white transition-all duration-300"
                        >
                            Explore Products
                            <LuArrowUpRight className="text-base group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </Link>

                    </div>

                </div>

                <div className="h-px bg-white/15"></div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">

                    <p className="text-xs text-white/50 text-center sm:text-left">
                        © {new Date().getFullYear()} Splendor. All rights reserved.
                    </p>

                    <div className="flex items-center justify-center gap-5 text-xs text-white/55">

                        <Link
                            to="/"
                            className="hover:text-white transition-colors duration-200"
                        >
                            Home
                        </Link>

                        <Link
                            to="/products"
                            className="hover:text-white transition-colors duration-200"
                        >
                            Shop
                        </Link>

                        <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300"
                            aria-label="Back to top"
                        >
                            <LuArrowUp className="text-base" />
                        </button>

                    </div>

                </div>

            </div>

        </footer>
    )
}

export default Footer