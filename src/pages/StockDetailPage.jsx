import { useEffect } from "react"
import { useParams } from "react-router-dom"
import finnHub from "../apis/finnHub"

export const StockDetailPage = () => {
    const {symbol}= useParams()

    useEffect(()=> {
        // TODO: stopped here
        // const fetchData = async () => {
        //     const response = await
        // }
    })

    return (
        <div>
            StockDetailPage {symbol}
        </div>
    )
}