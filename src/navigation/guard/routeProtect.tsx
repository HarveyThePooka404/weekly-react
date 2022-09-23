import Link from "next/link"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
  }


export default function RouteProtect(props: any) {

    if(props.status == "authenticated") {
        return (<span> {props.children} </span>)
    } else {
        return (
            <div>
                <h2> You need to be logged in to see this content.</h2>
                <Link href="/api/auth/signin"> Login </Link>
            </div>
        )
    }
}

