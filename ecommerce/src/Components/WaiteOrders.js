import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Pagination, Stack } from "@mui/material";
import PaginationPage from "components/PaginationPage";
import { Box } from "@mui/system";
import { BiDetail } from "react-icons/bi";
import OrderCheck from "./modal/OrderCheck";
import { DataContext } from "Context/DataContext";
import PN from "persian-number";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const WaiteOrders = () => {
  //get token
  const token = localStorage.getItem("token");

  //see data
  const [see, setsee] = React.useState(null);

  //show modal
  const [showModal, setShowModal] = React.useState(false);
  const productContext = React.useContext(DataContext);

  //show detailes
  const handleShowDetailes = (row) => {
    setShowModal(!showModal);
    setsee(row);
  };

  //pagination waite
  let [page, setPage] = React.useState(1);
  const perPage = 5;

  const count = Math.ceil(productContext.dataOrders.length / perPage);
  const product = PaginationPage(productContext.dataOrders, perPage);

  const handleChange = (e, p) => {
    setPage(p);
    product.jump(p);
  };

  //filter product
  const filterProduct = () => {
    return product.currentData()?.filter((item) => item.orderStatus === 3);
  };

  React.useEffect(() => {
    productContext.getOrders();
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {showModal ? (
          <OrderCheck
            employee={see}
            open={showModal}
            handleClose={() => setShowModal(false)}
          />
        ) : null}
        <TableContainer dir="rtl" component={Paper} sx={{ padding: "30px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="right">نام </StyledTableCell>
                <StyledTableCell align="right">نام خانوادگی</StyledTableCell>
                <StyledTableCell align="right">مجموع مبلغ</StyledTableCell>
                <StyledTableCell align="right">زمان ثبت سفارش</StyledTableCell>
                <StyledTableCell align="right">جزییات سفارش</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterProduct()?.map((row, index) => {
                return (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {PN.convertEnToPe(index + 1)}
                    </StyledTableCell>
                    <StyledTableCell align="right" component="th" scope="row">
                      {row.customerDetail?.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="right" component="th" scope="row">
                      {row.customerDetail?.lastName}
                    </StyledTableCell>
                    <StyledTableCell align="right" component="th" scope="row">
                      {PN.convertEnToPe(PN.sliceNumber(row.purchaseTotal))}
                    </StyledTableCell>
                    <StyledTableCell align="right" component="th" scope="row">
                      {new Date(row.orderDate).toLocaleDateString("fa-IR")}
                    </StyledTableCell>
                    <StyledTableCell align="right" component="th" scope="row">
                      <IconButton
                        className="icon-navbar"
                        onClick={() => handleShowDetailes(row)}
                      >
                        <BiDetail />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack className="pager" padding="30px">
          <Pagination
            size="large"
            count={count}
            color="secondary"
            onChange={handleChange}
            page={page}
          />
        </Stack>
      </Box>
    </>
  );
};

export default WaiteOrders;
