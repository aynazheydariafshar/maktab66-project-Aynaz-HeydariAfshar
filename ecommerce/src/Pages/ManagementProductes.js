import ManagementLayout from "layout/ManagementLayout";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useCategory from "hooks/useCategory";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Button, IconButton, Pagination, Stack } from "@mui/material";
import PaginationPage from "components/PaginationPage";
import { Box } from "@mui/system";
import AddProductes from "components/modal/AddProductes";
import axios from "axios";
import EditeProduct from "components/modal/EditeProduct";
import { DataContext } from "Context/DataContext";
import PN from "persian-number";
import { toast } from "react-toastify";

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

function ManagementProductes() {
  //context data
  const productContext = React.useContext(DataContext);

  //category
  const { category, loadingcategory, errorcategory } = useCategory();

  //show modal
  const [showModal, setShowModal] = React.useState(false);

  //edit modal
  const [showModalEdite, setShowModalEdite] = React.useState(false);

  //edit data
  const [edite, setEdite] = React.useState(null);

  // //pagination data
  let [page, setPage] = React.useState(1);
  const perPage = 5;

  const count = Math.ceil(productContext.data.length / perPage);
  const product = PaginationPage(productContext.data, perPage);

  const handleChange = (e, p) => {
    setPage(p);
    product.jump(p);
  };

  //add product
  const handleAddProduct = () => {
    setShowModal(!showModal);
  };

  //edit product
  const handleEditeProduct = (row) => {
    setShowModalEdite(!showModalEdite);
    setEdite(row);
  };

  //delete data
  const removeItem = (itemId) => {
    axios
      .delete(`http://localhost:3002/products/${itemId}`)
      .then((res) => productContext.getdata());
    toast.error("محصول از لیست کالاها حذف شد");
  };

  React.useEffect(() => {
    productContext.getdata()
  }, [])

  return (
    <>
      <Button
        onClick={handleAddProduct}
        color="secondary"
        variant="contained"
        sx={{ padding: "15px", margin: "30px" }}
        endIcon={<MdOutlineAddCircleOutline />}
      >
        افزودن کالا
      </Button>
      {showModal ? (
        <AddProductes
          open={showModal}
          handleClose={() => setShowModal(false)}
        />
      ) : null}
      {showModalEdite ? (
        <EditeProduct
          employee={edite}
          open={showModalEdite}
          handleClose={() => setShowModalEdite(false)}
        />
      ) : null}
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TableContainer dir="rtl" component={Paper} sx={{ padding: "30px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="right">نام کالا</StyledTableCell>
                <StyledTableCell align="right">عکس</StyledTableCell>
                <StyledTableCell align="right">گروه</StyledTableCell>
                <StyledTableCell align="right">زیر گروه</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product.currentData()?.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {PN.convertEnToPe(index + 1)}
                  </StyledTableCell>
                  <StyledTableCell align="right" component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <img
                      src={`http://localhost:3002/files/${row.image}`}
                      width="50px"
                      height="50px"
                    />
                  </StyledTableCell>
                  {category?.map((el) => {
                    if (row.category === el.id) {
                      return (
                        <StyledTableCell align="right">
                          {el.group}
                        </StyledTableCell>
                      );
                    }
                  })}
                  {category?.map((el) => {
                    if (row.category === el.id) {
                      return (
                        <StyledTableCell align="right">
                          {el.subgroup}
                        </StyledTableCell>
                      );
                    }
                  })}
                  <StyledTableCell component="th" scope="row">
                    <IconButton
                      className="icon-navbar"
                      onClick={() => handleEditeProduct(row)}
                    >
                      <FaRegEdit fontSize="20px" />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <IconButton
                      className="icon-trash"
                      onClick={() => removeItem(row.id)}
                      sx={{ marginLeft: "50px" }}
                    >
                      <FaTrash fontSize="20px" />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
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
}

export default ManagementLayout(ManagementProductes);
