const Title = ({ title }) => {
    return (
        <div className="px-4 md:px-10 lg:px-20 w-full flex justify-center py-10">
            <h1 className="uppercase text-2xl md:text-3xl tracking-widest text-text font-semibold">{title}</h1>
        </div>
    )
}

export default Title
