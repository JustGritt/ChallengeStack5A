import { FC } from "react"

type formuleProps = {
    primaryTitle: string,
    formules: Array<{
        title: string,
        duration: string,
        price: string,
        description: string,
        options: Array<string>
    }>

}

const Formule: FC<formuleProps> = (props: formuleProps) => {
    return (
        <div className="w-full my-4">
            <h2 className="text-black font-bold text-xl my-2">{props.primaryTitle}</h2>
            <div className="rounded-lg border border-1 border-gray-300 px-6 shadow-lg">
                {
                    props.formules.map((formule, index) => {
                        return (
                            <div key={index} className="flex justify-between p-4">
                                <div>
                                    <span className="text-black">{formule.title}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">{formule.duration} • {formule.price}</span>
                                </div>
                                <div>
                                    <button className="p-2 bg-black text-white rounded-md w-fit">
                                        Choisir
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}