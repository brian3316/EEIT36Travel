package tw.test.mike.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" })
@Entity
@Table(name = "place")
public class PlaceBean {

    @Id
    @Column(name = "placeid")
    private String placeid;

    @Column(name = "placename")
    private String placename;

    @Column(name = "placephotoreference")
    private String placephotoreference;

    @Column(name = "placeaddress")
    private String placeaddress;

    @Column(name = "placephonenumber")
    private String placephonenumber;

    @Column(name = "placeweektext")
    private String placeweektext;

    @Column(name = "placelocationlat")
    private String placelocationlat;

    @Column(name = "placelocationlng")
    private String placelocationlng;

    @Column(name = "placecity")
    private String placecity;

    public String getPlaceid() {
        return placeid;
    }

    public void setPlaceid(String placeid) {
        this.placeid = placeid;
    }

    public String getPlacename() {
        return placename;
    }

    public void setPlacename(String placename) {
        this.placename = placename;
    }

    public String getPlacephotoreference() {
        return placephotoreference;
    }

    public void setPlacephotoreference(String placephotoreference) {
        this.placephotoreference = placephotoreference;
    }

    public String getPlaceaddress() {
        return placeaddress;
    }

    public void setPlaceaddress(String placeaddress) {
        this.placeaddress = placeaddress;
    }

    public String getPlacephonenumber() {
        return placephonenumber;
    }

    public void setPlacephonenumber(String placephonenumber) {
        this.placephonenumber = placephonenumber;
    }

    public String getPlaceweektext() {
        return placeweektext;
    }

    public void setPlaceweektext(String placeweektext) {
        this.placeweektext = placeweektext;
    }

    public String getPlacelocationlat() {
        return placelocationlat;
    }

    public void setPlacelocationlat(String placelocationlat) {
        this.placelocationlat = placelocationlat;
    }

    public String getPlacelocationlng() {
        return placelocationlng;
    }

    public void setPlacelocationlng(String placelocationlng) {
        this.placelocationlng = placelocationlng;
    }

    public String getPlacecity() {
        return placecity;
    }

    public void setPlacecity(String placecity) {
        this.placecity = placecity;
    }

    @Override
    public String toString() {
        return "PlaceBean{" +
                "placeid='" + placeid + '\'' +
                ", placename='" + placename + '\'' +
                ", placephotoreference='" + placephotoreference + '\'' +
                ", placeaddress='" + placeaddress + '\'' +
                ", placephonenumber='" + placephonenumber + '\'' +
                ", placeweektext='" + placeweektext + '\'' +
                ", placelocationlat='" + placelocationlat + '\'' +
                ", placelocationlng='" + placelocationlng + '\'' +
                ", placecity='" + placecity + '\'' +
                '}';
    }
}
