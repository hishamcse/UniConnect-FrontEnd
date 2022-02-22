// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// not included in project

import { NextApiRequest, NextApiResponse } from "next";
import oracledb from 'oracledb';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
	let connection;
	try {
		connection = await oracledb.getConnection( {
			user          : "c##asdf",
			password      : "abcd1234" ,
			connectString : "localhost/orcl"
		});

		let result = await connection.execute(
			`SELECT * FROM TEST`
		);
		console.log(result);
		console.log(result.rows)
		
		result = await connection.execute(
			`INSERT INTO TEST VALUES(:v)`, ['3'], {autoCommit : true}
		)
		console.log(result);
		
		res.send(result)
	}
	catch (err) {
		console.error(err);
	}
}
