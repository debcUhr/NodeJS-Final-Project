import sqlite3 from 'sqlite3';
import { initializeTables, getByMemberIDCmd, searchMemberCmd, insertMemberCmd, updateMemberCmd, deleteMemberCmd } from '../helpers/sqlQueries.js'

const db = new sqlite3.Database('./localDatabase.db');
const membersTblCmd = initializeTables('members')

db.run(`${membersTblCmd}`)

export default class MembersDataStore {
    getAllMembers = async () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM Members", (err, rows) => {
                resolve(rows)
            });
        })
    }

    getByMemberID = async (memberID) => {
        return new Promise((resolve, reject) => {
            db.all(getByMemberIDCmd, [memberID], (err, rows) => {
                resolve(rows)
            });
        })
    }

    searchMember = async (name, status) => {
        return new Promise((resolve, reject) => {
            db.all(searchMemberCmd, [name, status], (err, rows) => {
                resolve(rows)
            });
        })
    }

    insertMember = async (member) => {
        db.serialize(() => {
            db.run(insertMemberCmd, [member.name, member.joinedDate, member.status])
        })
    }

    updateMember = async (member) => {
        db.serialize(() => {
            db.run(updateMemberCmd, [member.name, member.joinedDate, member.status, member.memberID])
        })
    }

    deleteMember = async (memberID) => {
        db.serialize(() => {
            db.run(deleteMemberCmd, [memberID])
        })
    }
}
