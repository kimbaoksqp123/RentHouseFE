import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./pageStyle.css";
import SavedListPost from "./SavedListPost";
import { useContext, useEffect } from "react";
import { PostContext } from "../../routes";

export default function Bookmark() {
  const { setCurNavOption } = useContext(PostContext);
  useEffect(() => {
    setCurNavOption("bookmarks");
    //scroll to top:
    const offset = 0;
    document.body.scrollTop = offset; // For Safari
    document.documentElement.scrollTop = offset; // For Chrome, Firefox, IE and Opera
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Row
        className="mt-3 pb-5"
        style={{ marginLeft: "10%", marginRight: "10%" }}
      >
        <Col className="" md={12}>
          <SavedListPost />
        </Col>
      </Row>
    </>
  );
}
