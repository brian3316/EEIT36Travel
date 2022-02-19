package tw.test.mike.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tw.test.mike.bean.PlaceBean;
import tw.test.mike.dao.PlaceRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlaceService {
    @Autowired
    private PlaceRepository placeRepository;

    public List<PlaceBean> selectAll(){
        return placeRepository.findAll();
    }

    public PlaceBean selectbyId(PlaceBean placeBean){
        PlaceBean result = null;
        Optional<PlaceBean> optional = placeRepository.findById(placeBean.getPlaceid());

        if(optional.isPresent()){
            result = optional.get();
            return result;
        }
        return result;
    }

    public PlaceBean create(PlaceBean placeBean){
        Optional<PlaceBean> optional = placeRepository.findById(placeBean.getPlaceid());
        if(!optional.isPresent()){
            return placeRepository.save(placeBean);
        }
        return null;
    }

    public PlaceBean update(PlaceBean placeBean){
        Optional<PlaceBean> optional = placeRepository.findById(placeBean.getPlaceid());
        if(optional.isPresent()){
            return placeRepository.save(placeBean);
        }
        return null;
    }
}

