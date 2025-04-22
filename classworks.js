import { randomUUID as uuid } from 'crypto';

export function makeClassworkList() {

    const id1 = uuid();
    const id2 = uuid();

    const classworks = {
        [id1]: {
            id: id1,
            title: 'complete React HW',
            dueDate: '2025-04-21',
            done: false,
        },
    };

    const classworkList = {};

    classworkList.contains = function contains(id) {
        return !!classworks[id];
    };

    classworkList.getClassworks = function getClassworks() {
        return classworks;
    };

    classworkList.addClasswork = function addClasswork(title, dueDate) {
        const id = uuid();
        classworks[id] = {
            id,
            title,
            dueDate,
            done: false,
        };
        return id;
    };

    classworkList.getClasswork = function getClasswork(id) {
        return classworks[id];
    };

    classworkList.updateClasswork = function updateClasswork(id, updated) {
        if (!classworks[id]) return;

        if (updated.title) {
            classworks[id].title = updated.title;
        }

        if (updated.dueDate) {
            classworks[id].dueDate = updated.dueDate;
        }

        if (updated.done !== undefined) {
            classworks[id].done = updated.done;
        }
    };

    classworkList.deleteClasswork = function deleteClasswork(id) {
        delete classworks[id];
    };

    return classworkList;
}
