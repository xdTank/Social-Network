import React, { ComponentType, Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

type IntrinsicAttributes = {}

export function withSuspense<WCP extends IntrinsicAttributes>(WrappedComponent: ComponentType<WCP>) {
    return (props: WCP) => {
        return <Suspense fallback={<div><Preloader /></div >}>
            <WrappedComponent {...props} />
        </Suspense>

    }
}