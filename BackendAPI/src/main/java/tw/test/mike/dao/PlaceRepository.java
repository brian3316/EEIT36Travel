package tw.test.mike.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tw.test.mike.bean.PlaceBean;

public interface PlaceRepository extends JpaRepository<PlaceBean, String> {
}
