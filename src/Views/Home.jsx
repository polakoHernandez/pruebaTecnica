import * as lib from "../libraries/home";
import { styles } from "../Styles/home";
import ProductController from "../Controllers/ProductController";
import { createSlug, searchProducstByDateRange } from "../Utils/home";

const Home = () => {
  const [productList, setProductList] = lib.useState([]);
  const [loading, setLoading] = lib.useState(false);
  const [sizeListProducts, setSizeListProducts] = lib.useState(0);
  const [page, setPage] = lib.useState(1);
  const [productToSearch, setProductToSearch] = lib.useState("");
  const [productFound, setProductFound] = lib.useState(null);
  const [start, setStart] = lib.useState("");
  const [end, setEnd] = lib.useState("");
  const [openProductModal, setOpenProductModal] = lib.useState(false);
  const [reload, setReload] = lib.useState(false);
  const [method, setMethod] = lib.useState("create");
  const LIMIT = 12;
  const totalPages = productFound ? 1 : Math.ceil(sizeListProducts / LIMIT);

  const getProducts = async (currentPage) => {
    try {
      setLoading(true);

      const offset = (currentPage - 1) * LIMIT;
      const response = await ProductController.getProductsByPagination(
        offset,
        LIMIT,
      );

      setProductList(response?.products);
      setSizeListProducts(response?.totalItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchProductById = async () => {
    if (!productToSearch) {
      lib.toast.error("Debe ingresar un titulo de producto");
      setLoading(false);
      return;
    } else {
      setLoading(true);
      const response = await ProductController.getProductByTitle(
        createSlug(productToSearch),
      );

      switch (response.status) {
        case 200:
          setProductFound(response.product);
          setLoading(false);

          break;
        case 400:
          setProductFound(null);
          lib.toast.error("Producto no encontrado");
          setLoading(false);
          break;
      }
    }
    setLoading(false);
  };

  const showProductsByDateRange = () => {
    const response = searchProducstByDateRange(productList, start, end);
    if (response.length === 0) {
      lib.toast.error("No se encontraron productos en ese rango de fechas");
    } else {
      // setProductList(response);
      setSizeListProducts(response?.length);
    }
  };

  lib.useEffect(() => {
    getProducts(page);
  }, [page, reload]);

  return (
    <lib.Box sx={{ ...styles.mainContainer }}>
      <lib.Box sx={{ ...styles.topContainer }}>
        <lib.Box sx={{ ...styles.logoPlatziContainer }}>
          <img
            style={{ width: "200px", height: "40px" }}
            src="https://static.platzi.com/media/uploads/Platzi_Logo_e2f36f10bc.png"
          ></img>
        </lib.Box>
      </lib.Box>
      <lib.Box sx={{ ...styles.middleContainer }}>
        <lib.Box sx={{ ...styles.firstFiltersContainer }}>
          <lib.Box sx={{ ...styles.secondFiltersContainer }}>
            <lib.Box
              sx={{
                ...styles.thirdFFiltercontainer,
              }}
            >
              <lib.TextField
                value={start}
                onChange={(e) => setStart(e.target.value)}
                type="date"
                sx={{ mb: "10px" }}
                helperText="Fecha inicial"
              ></lib.TextField>
              <lib.TextField
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                type="date"
                sx={{ mb: "10px" }}
                helperText="Fecha final"
              ></lib.TextField>
              <lib.Button
                onClick={showProductsByDateRange}
                variant="contained"
                sx={{ bgcolor: "black", mb: "10px" }}
              >
                Buscar
              </lib.Button>
            </lib.Box>
          </lib.Box>
        </lib.Box>
        <lib.Box sx={{ ...styles.firstProductsContainer }}>
          <lib.Box sx={{ ...styles.firstInputContaniner }}>
            <lib.Box sx={{ ...styles.thirdInputContainer }}>
              <lib.TextField
                sx={{ width: "300px", mr: "10px" }}
                value={productToSearch}
                onChange={(e) => setProductToSearch(e.target.value)}
                label="Buscar producto"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <lib.InputAdornment position="end">
                      <lib.CancelOutlined
                        onClick={() => {
                          setProductFound("");
                          setProductToSearch("");
                          getProducts(1);
                        }}
                        color="error"
                        sx={{
                          display: productFound ? "block" : "none",
                          cursor: "pointer",
                        }}
                      />
                    </lib.InputAdornment>
                  ),
                }}
              />
              <lib.Button
                sx={{ bgcolor: "black" }}
                variant="contained"
                endIcon={<lib.SearchOutlined />}
                onClick={() => {
                  searchProductById();
                  setPage(1);
                }}
              >
                Buscar
              </lib.Button>
            </lib.Box>
            <lib.Box
              sx={{
                width: "40%",
                height: "100%",
                // bgcolor: "red",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "start",
              }}
            >
              <lib.Typography variant="h6">
                Total: {sizeListProducts}
              </lib.Typography>
              <lib.Button
                onClick={() => {
                  (setOpenProductModal(true), setMethod("create"));
                }}
                endIcon={<lib.Add></lib.Add>}
                sx={{ bgcolor: "black", color: "white" }}
              >
                Agregr producto
              </lib.Button>
            </lib.Box>
          </lib.Box>
          <lib.Box sx={{ ...styles.secondProductsContainer }}>
            {loading ? (
              <lib.CircularProgress color="secondary"></lib.CircularProgress>
            ) : productFound ? (
              <lib.Grid
                sx={{ ...styles.secondProductsContainer }}
                container
                spacing={2}
              >
                <lib.Grid size={3} item key={productFound?.id}>
                  <lib.ProductCard
                    reload={() => setReload(reload + 1)}
                    openProductModal={() => setOpenProductModal(true)}
                    title={productFound?.title}
                    price={productFound?.price}
                    slug={productFound?.category?.name}
                    image={productFound?.images[0]}
                    description={productFound?.description}
                    categoryId={productFound?.category?.id}
                    id={productFound?.id}
                  />
                </lib.Grid>
              </lib.Grid>
            ) : (
              <lib.Grid
                sx={{ ...styles.secondProductsContainer }}
                container
                spacing={2}
              >
                {productList.map((product) => (
                  <lib.Grid size={3} item key={product?.id}>
                    <lib.ProductCard
                      reload={() => setReload(reload + 1)}
                      id={product?.id}
                      categoryId={product?.category?.id}
                      description={product.description}
                      title={product?.title}
                      price={product?.price}
                      slug={product?.category?.name}
                      image={product?.images[0]}
                    />
                  </lib.Grid>
                ))}
              </lib.Grid>
            )}
          </lib.Box>
        </lib.Box>
      </lib.Box>
      <lib.Box sx={{ ...styles.bottomContainer }}>
        <lib.Box
          sx={{
            width: "400px",
            height: "100%",
          }}
        >
          <lib.Pagination
            color="primary"
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </lib.Box>
      </lib.Box>
      <lib.ProdcutModal
        method={method}
        reload={() => setReload(reload + 1)}
        open={openProductModal}
        toggleModal={() => setOpenProductModal(false)}
      ></lib.ProdcutModal>
    </lib.Box>
  );
};

export default Home;
