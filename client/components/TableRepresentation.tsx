import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { colors } from "@/constants/colors";
import { TableFormat } from "@/assets/Evaluater";
import ParserError from "@/assets/model/ParserError";

export default function TableRepresentation({ tableData }: { tableData: TableFormat }) {
    if (tableData instanceof ParserError) {
        return <p>{tableData.message}</p>;
    }
    if (tableData.length === 0) {
        return <p>Empty</p>;
    }
    // TODO: fix keys
    return (
        <TableContainer
            mx={"auto"}
            maxW={"90%"}
            display={"grid"}
            placeItems={"center"}
            fontSize={"lg"}
        >
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {Object.entries(tableData[0]).map(column => (
                            <Th
                                key={column[0]}
                                fontSize={"xl"}
                                fontWeight={"extrabold"}
                                color={useColorModeValue(...colors.bodyColor)}
                                textAlign={"center"}
                                borderColor={useColorModeValue(...colors.tableBorderColor)}
                            >
                                {column[0]}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {tableData.map((evaluation, index) => (
                        <Tr key={index}>
                            {Object.entries(evaluation).map((column, index) => (
                                <Td
                                    key={index}
                                    textAlign={"center"}
                                    borderColor={useColorModeValue(...colors.tableBorderColor)}
                                >
                                    {column[1] ? "T" : "F"}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
