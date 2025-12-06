import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storage } from "../utils/storage";
import { getFullURL } from "../utils/config";
import React from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = storage.isLoggedIn();
  const handleLogout = async () => {
    try {
      const response = await fetch(getFullURL("/api/auth/logout"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Logged out successfully!");
        storage.clearUser();
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Network error");
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm bg-slate-200">
        <div className="flex-1">
          <Link to="/">
            <p className="btn btn-ghost text-xl">NutriTracker</p>
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 rounded-full h-10">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAaVBMVEX///8AAAD8/PwEBAT5+fkICAgzMzPr6+v29vbW1tbn5+fz8/Pu7u7i4uLFxcU7OztSUlKtra3Nzc0SEhKXl5dtbW2goKAqKiq+vr6RkZEdHR1kZGRbW1tycnIlJSWCgoJKSkpDQ0N6enpcLQBWAAAQ30lEQVR4nO0diXqyuhJC2GRfRHBDff+HvJlsYCsyQdSe7/5zTvu3FpJMMpk9E8v6B//gH/yDf/D/AZQQy5L/s58BqPhV/JX9SL47QiQQOVb6cLyEDF//NfCTsEw5lGHi648ZKv8dZOJNWXR5trfvwdlneVeUm/jb48MBoVEcNressp9A5d2a0I/o31wcQikFuvGTtjk8Q2MMx7pNfMCH/K0NBFsg2JTt9iqoyZnFRDxx3balHxDBM/4O+GVzOmtMZpFhDzkuf+p8asK/tYWS4nblQ4RBzi+LwNYBdFz2w6Uvkm9joGRFFPaHs0BlNFbHuf/I1r866q+2XsPzoQ+DLzNswsidlrfLY0KaWCG+er8/vvRp8E1GAF2nW89VdKO3g4bz5Xbru65m0HX97XY524+e4z+53ja1rK8tDbHKw56Pxfm5Dnvv2LXJJgrIGGgU+X7bHbx7Yeqoxdofyi+hwjhYz4fi/kQm69KYCnThH4UK+1F8atE47bKfyAjm1n+Ys8mh+cVoOJJqqnPet9h22v5yrtTbQ1uFbwk99Y0oDADaPInS44jwBZfy8rrlE0tmByJ2epDWF2+8f/i/xzTiM/ZuPNRASNJVYkL1lO7YmvA55ZQ134bkwpu2zzVXkMRadeEHeXTQ5oz7OPYgIfenIqRcRyOYhYHdI+01i4TFaa8XhrXHuGPeBh/Ahi9+0nlym0hsrnJRFGkgxkFEa+IVv+2vnJM4agN5XaK7exsQJqfbsV7sgHYVRq+2y7SI871Kd2jfvnFY44WnehXb/lT61ouyDsYcpyel64g58po38zPGMG/7u2U5MP71sj3CqY3EsOQSF9Aq9rc3b5xgO2KkrL9GsOIXWwVU+Oo0mhPwLrZvk6DQW+mpNXFd13Zuq3cW30AXcNVseeWb7DY2d2mm9ijQwa59gzQgrce5viTjLH2P6klomwGFSSV5f0pWZzcEJFTCdqVQo6E3rw3egUxQ7ISBKAigCbgnYt0+QJBatPEUe2FfXrEyU4NB04Kvi9yaTAqoXbtqR4KvCUkmNYxsZWygi+Ks5sq1K05iq3Yx7o2R2qkaLOt9QVbtjVqMxjRP3tf+/CvLAYbu13LjwDevWLf5dj9o6ucieq+eAcw4krPHe9y3a64Mky+usG1Z4292PKiwR6rEJxMDu3ClttnAw0wZk669X6ndeUj2fAb5BGbhKmvDcIlzJVxYsx/DhdGDLfqFf/J4DXKgJL7Z2gw7f9R9Uu5tPYmrqE6E1pXmY9d0hRbxXVvpVZifYH92LxtNbGWYsuRI4mV6nxHpPiAMQ1JJM84DmGZj74oX7QxmqZe5Nl48fHMi7EJ/hjWlnYwfFWl3ysSxLyH3C6Hf/dESY/jxSZti58ZgoZV5b0VJWLYQ0iyTWLk8DEYUNGdtCJ7iF1gaWxda6P1SdbFpUyQsutshv3gMrpfjqS/KyNRLEXeVttFf0muYhPG0O/+YGDYUFX2+s+9gfz3ViWVEZ1Zy1Man94q0CUguOCNj95mPnVKexWD59eXs2r+B4SPYCHqB/ExP6GW52UmtRmp7bFQFej4DUNmL7BEmcvP1Bv4c8AcNtmezFBfL2kgRzJrq0C/BjCeZPRnY5A72Am3XwWOdrVXoxfFCepDqhGtfBu/wPAQNe23wSvwE/octdlScGpU+5dqHpZZa66rZrUKDCMOGO9UncZEBjGOJJX/2XKg5mouOmIxbIFaUKaoAUkVufsaOMVkNoAi3BONhF2Np9FCyBZ5BRlXNXqh4jr3FcjJu8eKSGlz72lLcuIA3blUEZY+e2PGwwlwpy7sS7Ychm9OTQPOPxfGwJAPux52KeOTmwoZYdcXNPPZ6F0zkjv1+i/b272jtBLC1wRpHjOY7Ww6nqk31M7EwYgLZVKDmAlavfhjjn1ga1nSEXvPwqN4zXxraqEE54O5DoAIdlKj9ounMtnuLIJ0jw4DcxpTMkoOa4iNOIvAx7WyDleEhP7zlqpbGwY5IA22UBGfcA6cQMWRq22hlQEsCQsOtDBHxDvaSa+jj3GxtQ2WZyYxkZ4KL4LQVVttS6jMkP2w3eEzYnpROK5cZq9i3qHV6OvQJuCJphpEHeO7FXKUWViMB4d8rGYN28VCSPMxumoNzgeZNfq7CEH2ERsYCm0yIC7fDGh6ENmcDElPg2lu8MS5Fn82tNLR+1Shxm4VoKyreGjCyETIZzn3FLYurIhgD10qQK17WY9+xwMe1ABku0XGjYl+9UrrzCI1NqPsycPo1PzOysWDgqyy1yYdXhDr1ygWvBkX9MlSEuoQd2kW91GHZBlWON2bHoMXToDKY4cLoDG1vUWHXADI7lI4F41LOd3uD94YwxdREYCoAg9QgMJao19DOgFpRZm6gnhbTA56DGm08UkvrzjVyXEc1xw0qdexlZLoIa/qRgc6OuGElKtJbbSz6CWRu2HgvQ2ajgqsVTj9rFZUdAwOfTDHpKJsF0BuxsiYQ2ib7wrANwiSTTIY1ch28gMwBnVWglRPW17w8BxPLU8EqpLm8BjJ4eRYqZLx5XJj0U577yreQdplEZimc0J4s9pQv/YH2bk5B5dn9MjcC1FmD5IUXkOmx1iZkbkc8fQ8caOkc3bBGi0ok99s1NYm6vSJnsGwGwoC0lmZAVczRDdthJ7mMVWvkBAkvizQAGJdRagxplUJ7mo8nBgeJjGeWvrBQN7ONfeGl0hwP84oDGEC8j9zMofMRrZkP8CKRuW5mkQkz2cfJMA+reXo0cxoX0478rXz1OufZJFa7k53UWCVbwpCNaoZMhd7/AsDrzMGbS9zi/nIBphlr/iIfgIP1AQyg+KY7b6B1ypYxTr9bZDc75pnYI2TmQO3jvXHOzzK/2d44gJyqSZvXzm7ySQ8dc5RA9atGcDXNlSA67f02J2diFZE8GmbJsXaTHTJoJoH7mmvjOFiYK0Ezp535GhnTiDshPF4/GWX+jQtEAS7mGX6JMp0Pc7tto59ckj5QmcZn7NI8WzHR8z1nbCYqvcwkbKAhNY2c3bDR0hFslNScJZ5wKTLCWugMTDT24CVacKRko0InswpXqPjracnKWAF0hAydO/ho8x3olcEjs4jMCCdoDDLwRGZmZHweGZ5tgkGGH79YlHH5MWQCwqPCs8hA6Kegy44UYJEhAzcz2TMqJZbnwpCkH5+tfbgoNmQ1icwZQgPLLBtmjMyz98ggkcxWhshkRg5R7T5JN7vPN5PqP94NfM+an0/CIqEpuSvR4wr30xuHa+WFMnlVBMxgafBCc6E647dbbf1y1IrdY1Q4OpCjqZAgcZ83iQmZDerMnIkaaYJEywASJHU2rCUQG6WW3+niEndL5Hrb0rKGlJkI0jqqk6rtgACdEjQfpx5MgNlWKT9YlxQnOWKGfzBKUoqa0/Vs30GVHeA4uSBLiDCQWBnBu7qMCE9In0sGxZsAJsYZ+HLDhrM/IScv4f300rDoT8fLded5u+yaH24NL8KgNhdRZTjk9PVpLDjj8zEaGGcmZnNQ1leNCddP2rEXhHPeKCnTlkFahj5nwnqkIGFv47ftc9/Cnp7R1tBms5FDI6wvEhVHpentRgcFyS+hSKj4TH0MBR8cZQHxf3e3dpazKWRm7bqRq+nZ4RueH9/k2lOmE+3sPa+EA+JDn9MYuhRJ86pwCy/4MICsPeP1oXX/1g8Iatndbt7VNO8E5DNL0sOD/HiuPtZ8i0/n+Qp3fNAeJgTRpXkaFfBPEpnZQ3VEumedJ+5ZmNZN700qYNWliERbD4FyNMvteVKF2x/TJxk7iYrRz7lnWTeBkpq7Kd4MQ8knRwIfu147Lc9gWcPjXpHW7wYccQx8aqChIs45xzl0dJNjmubNpFCFfB5goo4Md5MaRFAA33DdqVpo/MPJCDSENMRbp7mMdfbnQh3+q+mvp2G70A3SP+bV7ea+iCGJ/LI9zr8JcC2tXzM/BJvASTUbbILjhDJrnmkL5Kc2C78lKHtF7tFjU6RhmDAIw7ItDsJacqbP1ugG7Kplkxn86J4QqW+JMOCsChTtJLVAgPZ3mQR5dHIGXGf0VJV5nqfSBB1UzUDefxP85AIgEZQ82MXzujYPndsydP774dZDpcc7qlje+FEHyoi4SFzgxfqBqEtUsxnCbLhLaphYFwQyzjAkUd9B6Qk4j6fAuOp+HGZkv4ySGjB2Q2vLuTve70Aqj+diBrMSuDW9Ezgq3QQAFwndqEQg9y4NhFjyFMrnAM4Aj8/YLEgEghQt0VgznhYqfGIfxIarauMFgCwF9SdkipalNDk7v+PkMpj4yaVhcBkL3wXJc4luKVEzQvlZhyVZCy/DYTjUSYhxWiMJPJWk2ehWKKjTX8AFmKreNsFAZR4yFk7HqcACF/ZfvJ3u8Z3IOLYbKkubEOmidO0OmddHIBda4G8rzTkQDPvzSwPy6RYoOjNP0ragAogUW8JnACzxghZ4KyNjQ3KNZETj9Hl07qCuAiAONlDKDy19Da6yDn+oi24W2KKhUGhmZ4+PnDDF+4mD8gOQCqdh54o6YTzjCukEfXAYqP0GJ1PAJCT3O/gD9WMzoWG3D8e04OARW+N8pr+3ggsHxdngi7NysqVGpWn9rQpKcJ9zWH1zZRgAJ9b1J0wDYeOjjVzv/iYubPiHgAxHGyvT8m1DliKcvt3a84buW5FhO14G9Rky5skjjasaaugm+45aprGB3KdG/eaalj4lo4nIE16w5Wuo8L77zfigtjEMR+ib5vxtMrPzRvnmFxyhHxc3uB4X5ZKuisz5akvLMDep5yGQYWr3UHai+uqOUUa8qOIHmYPG6TZ3BUGma5V8ChxJ8nZmXDFKQDtslG/jwoFr0EvLxekiOn8FoIjOsnWxeHmjP7EkCthgFiWOAZBBUP0VMDgF+wubQERgv40CBxhFThYXPAYf5g4KW38bDwAeyw4X7xgubMC38ydWRhjLLxQJZ/QZLyqM8QZwRIHD5ciAuypclOH/DriUryyMyBeBCuq2+12tGXat165QUTuAbJrvK2dVvULldmLJQrpfxAU6v8UmqY8TQIcSx98DXuIYfwJ+emWG4tPfAod7VpeXnf0BotDpNzaOKAuOSEtEgy7Y/gVk4Nu6BdvFrTPfQsbDl3NCAL/kYP8tZPYFj0OshgwPc4jrJz6H0ej6idXvIaCFSnj8GDIiE8DwJC8KCFQ7lzdgfgRcMJOz9j2X6Sw9vrwc4Kzwe266gBkqvfkRrAm83P3bLtWK7y+geh/wPt53AZUAevuYq/btV4NZ4hKity+NI26deevNMNzSa9HXTL8C4jq9N+IiN6O86FDIgVVB33HDLzr8zD2UgTiR8PSY3DJcAJGPXUHJQV4OKmdyVWR4c1WXfOz6c35o5P7a1lWROaYRWcOsRIE8V+m/UNDoGRS+uB3lQ9goiPkZK3k/6QtLJOJz8qrjt9469hRKcck5KtX5CTLq/le4hPpD+/4XQL/p1pP52K8gw7/z68E/tO8fYUOnL243hcutJNbyiMUKyPCUtiDsBbUZSFFHf+c/nQ99GKgWvw1JcbtydBwXXaaBp0lyL/L1Viy+vOQtEJfNiZvVDuoYhqNW0j6fmnI46vwHgFuD1C+L7VXPO4rOrtui9APypotml4HyBBE/aWvkMSwm6es28XnUBHvRwaeB0CgOm5P31ISrslsTxtEfWo6nEG/Ktr5mv4qE7bNr3ZabN5vDK8KduEiSsEzbNIWD2kmi9a2/Sli/gZDh+8M/fsbqWgXU8Wx1CyB4ike3BApk/isL8w/+wT/4B//gNfgfkg/IiNI79O0AAAAASUVORK5CYII="
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {!isLoggedIn && (
                <li>
                  <Link to="/login" className="justify-between">
                    Login
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link to="/meal-history" className="justify-between">
                     Meal History
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <p onClick={handleLogout}>Logout</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
