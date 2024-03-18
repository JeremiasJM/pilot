import AdminNav from "../components/admin/AdminNav";
export const metadata={
    title:"PILOT-endoscopy",
    description:"Pilot Panel del Administrador"
}
const AdminLayout = ({children}:{children: React.ReactNode} )=> {
    return (
        <div>
            <AdminNav/>
            {children}
        </div>
    )
}
export default AdminLayout;