import {client} from "../config/redis";

export const redis_data = async(req, res, next) => {
    
    const data = await client.get('all notes');
    if(data!=null){
        res.status(200).json({
            code: 200,
            data: JSON.parse(data),
            message: "All notes fetched successfully from redis"
        });
    }
    else{
        next();
    }
}

