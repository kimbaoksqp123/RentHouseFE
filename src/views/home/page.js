import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./pageStyle.css";
import ListPost from "./ListPost";
import RightFilter from "../../components/RightFilter";
import { useContext, useEffect } from "react";
import { PostContext } from "../../routes";

export default function Home() {
  const { setCurNavOption, navbarApartType } = useContext(PostContext);
  useEffect(() => {
    //scroll to top:
    const offset = 0;
    document.body.scrollTop = offset; // For Safari
    document.documentElement.scrollTop = offset; // For Chrome, Firefox, IE and Opera
    //check navbar apartment type status:
    if (navbarApartType === 0) {
      setCurNavOption("home");
    } else {
      setCurNavOption(`type_${navbarApartType}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row
        className="mt-3 pb-5"
        style={{ marginLeft: "10%", marginRight: "20%" }}
      >
        <Col className="" md={9}>
          <ListPost />
        </Col>
        <Col className="md-down-collapse p-2" md={3}>
          <RightFilter marginTop="72px" />
        </Col>
      </Row>
    </>
  );
}
