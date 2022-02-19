import { async } from "@firebase/util";
import { get, child, getDatabase, ref, update } from "firebase/database";
import { useNavigate } from "react-router-dom";


export async function getfirebaseinfo(currentemail, currentpassword, curradmininfo) {
    const dbRef = ref(getDatabase());
    const db = getDatabase();

    const getfirebasebackendinfo = await get(child(dbRef, `admin/`));

    const getdatabaseemailpassword = await getfirebasebackendinfo.val();

    const { email, password, isadmin, name } = await getdatabaseemailpassword;

    //console.log('this is test5', curradmininfo.name);
    if (email === currentemail && password === currentpassword) {
        await update(ref(db, `admin/`), { isadmin: "true", name: curradmininfo.name, id: curradmininfo.id });
        const newinfo = await (await get(child(dbRef, `admin/`))).val();
        const { isadmin } = newinfo;
        return isadmin

    } else {

        return "false"
    }

}

export async function getisadmin() {
    const dbRef = ref(getDatabase());
    const getfirebasebackendinfo = await get(child(dbRef, `admin/`));

    const getdatabaseemailpassword = await getfirebasebackendinfo.val();

    const { isadmin } = getdatabaseemailpassword;
    return isadmin
};

export async function gettestadminname() {
    const dbRef = ref(getDatabase());
    const getfirebasebackendinfo = await get(child(dbRef, `admin/`));

    const getdatabaseemailpassword = await getfirebasebackendinfo.val();

    const { name, id } = getdatabaseemailpassword;

    return name;
}

export async function setisadmin() {
    const db = getDatabase();
    await update(ref(db, `admin/`), { isadmin: "false" });
}

export async function getadminloginpage() {
    const dbRef = ref(getDatabase());
    const getisloginpage = await get(child(dbRef, `admin/isloginpage`));
    const getvalue = await getisloginpage.val();
    return getvalue
}
export async function setfradminloginpage() {
    const db = getDatabase();
    await update(ref(db, `admin/`), { isloginpage: "false" });
}

export async function getadminid(adminAname, adminname) {
    const a = await adminAname.filter((item) => item.name === adminname);
    console.log(a[0].id);
    const b = { id: a[0].id, name: a[0].name }
    console.log(b);
    return b;
};

export const crew = ['陳柏甫', '洪廷宥', '呂泊諺', '陳宇勛', '沈宗成'];