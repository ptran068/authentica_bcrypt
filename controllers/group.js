import Group from '../models/group';
import User from '../models/user';
import mongoose from 'mongoose';

class Groups {
  
    //type Set dufng de check phan tu da exist chua ,neu da exist thi tu dong remove

    async getAll (req, res, next) {
        try {
            //cong thuc tinh skip skip=(page-1) *skip
            const { limit, page } = req.query;
            const skip = (parseInt(page) - 1) * parseInt(limit);
            const groups = await Group.find().populate([{
                path: 'author',
                // select: 'email name',
                // where: {}
            },
            {
                path: 'members'
            }
        ]).sort({ _id: -1 }).skip(skip).limit(limit);
        //_id dc tajo theo time
        //sort({_id: -1}) or sort({_id:-1 ,'members._id: -1'}) khi 1 so record ko co createAt
        //litmit : gioi han so record
        // must validate limit.
            return res.json({
                isSuccess: true,
                groups
            });
        } catch (e) {
            return next(e);
        }
    }
    async createGroup (req, res, next) {
        try {
            
            const { name, author } = req.body;   
            const group = await Group.findOne( { author } );
            if (group) {
                return next( new Error('author is exist'));
            }
            const groupNew = new Group({
                  name,
                  lastMessage: new mongoose.Types.ObjectId(),
                  author,   // assign the _id from the person
                  members: new mongoose.Types.ObjectId(),
                });     
            await groupNew.save();
            return res.json({
                isSuccess: true,
                groupNew
            });

        } catch (e) {
            return next(e);
        }
    }
    async updateGroup (req, res, next) {
        try {
            const idGroup = req.params.id;
            const group = await Group.findById(idGroup);
            if (!group) {
                return next( new Error('Group is not found'));
            }
            const body = req.body;
            group.name = body.name;
            await group.update();
            return res.json({
                isSuccess: true,
                group
            });
        } catch (e) {
            return next(e);
        }

    } 
    
    async deleteGroup (req, res, next) {
        try {
            const idGroup = req.params.id;
            const group = await Group.findById(idGroup);
            if (!group) {
                return next( new Error('Group is not found'));
            } 
            group.deleteAt = new Date();
            await group.save();
            return res.json({
                isSuccess: true,
              
            }); 
        } catch (e) {
            return next(e);
        }
    }

    async addMember (req, res, next) {
        try {
            const groupId = req.params.id;
            const member = req.body.member;
            const group = await Group.findById(groupId);
            if (!group) {
                return next( new Error('Group is not found'));
            }
            group.members.push(member);
            await group.save();
            return res.json({
                isSuccess: true,
              
            });

        } catch (e) {
            return next(e);
        }
    }

    async deleteMember (req, res, next) {
        try {
            const groupId = req.params.id;
            const group = await Group.findById(groupId);
            if (!group) {
                return next( new Error('Group is not found'));
            }

            const body = req.body;
            group.members = body.members;
            await group.remove();
            return res.json({
                isSuccess: true,
              
            });
        } catch (e) {
            return next(e); 
        }
    }

}

module.exports = Groups;