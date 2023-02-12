import { MongoClient } from 'mongodb';

// /api/new-meetup

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = req.body;

        // fpm.mongodb.net/meetups?
        // fpm.mongodb.net/저장할 장소이름?
        const client = await MongoClient.connect('mongodb+srv://cdnwellhk:L2uczUlpLFurEkew@cluster0.ubf7fpm.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        // collection 안의 string은 컬렉션의 이름
        const meetupsCollection = db.collection('meetups');

        // 컬렉션에 새 문서를 삽입하기 위해 구축된 query 명령 중 하나인 insertOne을 호출할 수 있습니다. 
        // MongoDB의 훌륭한 점은 문서가 결국 object, 자바스크립트의 object라는 겁니다. 따라서 object의 제목, 이미지, 주소, 설명
        // 이 될 수 있습니다.
        // 직접 데이터를 삽입할 수 있으므로 전체 데이터 객체를 데이터베이스에 저장할 수 있게 됩니다.
        // destructuring을 사용할 필요도 없습니다.
        // 이제 이 데이터 객체를 데이터베이스에 삽입해 보겠습니다. 
        const result = await meetupsCollection.insertOne(data);

        //insertOne은 promise를 되돌리므로 await를 입력하여 결과값을 돌려받을 수 있습니다. 
        // 오류 처리를 추가해도 됩니다.
        console.log(result);

        // 데이터 베이스와 연결 차단
        client.close();

        // 되돌아오는 응답의 HTTP status 코드를 설정하기 위해 응답을 호출할 수 있는 status method를 갖게 되는데
        // 예를 들어, 201 status 코드는 어떤 것이 성공적으로 삽입되었음을 나타냅니다. 
        // 그런 다음, 여기서 JSON 호출을 연결하여 발신 응답에 추가될 JSON 데이터를 준비할 수 있습니다.
        // message를 입력할 수도 있습니다. 
        // 물론, 어떤 응답이 되돌아오게 할지는 여러분이 선택하시면 됩니다.
        // 데이터베이스에 meetups를 삽입할 기본 api 경로를 가지고 있으므로
        // 다음 단계에서는 이 api 경로를 trigger하고 코드를 사용할 수 있도록
        // 이 React Meetups 정보를 작성 및 제출하여 이 api 경로에 request를 보내도록 합니다.
        res.status(201).json({
            message : 'Meetup inserted!'
        });
    }
}

export default handler;