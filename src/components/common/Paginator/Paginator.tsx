import React, { FC } from "react"
import { Pagination } from "antd";

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}

const Paginator: FC<PropsType> = ({ totalItemsCount, pageSize, onPageChanged, portionSize = 10 }) => {
    return <div>
        <Pagination defaultCurrent={1} total={totalItemsCount} pageSize={pageSize} onChange={onPageChanged} defaultPageSize={portionSize} />
    </div>
}

export default Paginator