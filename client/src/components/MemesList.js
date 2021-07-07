import { Container, Row, Col } from 'react-bootstrap';
import MemeWrapper from './Memes'

const MemesList = (props) => {
    const { list } = props;
    return (
        <Container>
            <Row xs={2} md={3}>
                {list.map(m => {
                    return (
                        <MemeWrapper key={m.id} meme={m}></MemeWrapper>
                    );
                })}
            </Row>
        </Container>
    );
}

export default MemesList;