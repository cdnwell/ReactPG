const FIREBASE = "https://react-http-73797-default-rtdb.firebaseio.com";

export async function getAllRequests() {
    const response = await fetch(`${FIREBASE}/requests.json`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error("요청을 불러 오는데 실패하였습니다.");
    }

    const carriedRequests = [];

    for (const key in data) {
        const tmpData = {
            id : key,
            ...data[key]
        }
        
    }

}