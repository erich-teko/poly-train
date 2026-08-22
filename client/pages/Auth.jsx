import AuthContainer from "../src/components/AuthContainer"

function Auth({ formType = "login" }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <AuthContainer projectName="Poly-Train" formType={formType} />
    </div>
  )
}

export default Auth
