import Header from "@/components/layouts/header";

const LayoutDefault = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <div className="app bg-white">
            <Header />

            {children}
        </div>
    )
}

export default LayoutDefault;