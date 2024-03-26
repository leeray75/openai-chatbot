import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DataGrid } from '@mui/x-data-grid';




const ConversationsTable = () => {
    const [conversations, setConversations] = useState([]);
    const columns = [
        { field: 'timestamp', headerName: 'Timestamp', width: 250},
        { field: 'route-id', headerName: 'Conversation', width: 350},
        { field: 'link', headerName: '', width: 250, renderCell: ({row}) => {
            return (<Link href={`/image-generation/${row["route-id"]}`}>Go</Link>)
        }}
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `/api/image-generation`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch conversations from OpenAI");
                }

                const data = await response.json();
                const sorted = data.sort((a, b) => {
                    return a.timestamp - b.timestamp;
                })

                setConversations(sorted);

            } catch (error) {
                console.error("[ConversationsList] Error:", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <DataGrid
            rows={conversations}
            columns={columns}

            //checkboxSelection
        />
    );
};

export default ConversationsTable;
