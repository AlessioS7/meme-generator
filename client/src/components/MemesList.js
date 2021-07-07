import { Container, Row, Col } from 'react-bootstrap';
import MemeWrapper from './Memes'

const MemesList = (props) => {
    const { list } = props;
    console.log(list);
    return (
        <Container>
            <Row sm={3}>
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